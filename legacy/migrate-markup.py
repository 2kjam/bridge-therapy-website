"""One-time JSX conversion of the preserved static markup. Not used at runtime."""
import json
from html.parser import HTMLParser
from pathlib import Path

VOID = set('area base br col embed hr img input link meta param source track wbr'.split())

class Element:
    def __init__(self, tag, attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []

class Parser(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root = Element('root')
        self.stack = [self.root]
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        element = Element(tag, attrs)
        self.stack[-1].children.append(element)
        if tag not in VOID: self.stack.append(element)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID: self.handle_endtag(tag)
    def handle_endtag(self, tag):
        if self.stack[-1].tag != tag: raise ValueError(f'Unexpected closing {tag}: {self.stack[-1].tag}')
        self.stack.pop()
    def handle_data(self, text): self.stack[-1].children.append(text)

def find(node, predicate):
    if isinstance(node, str): return None
    if predicate(node): return node
    for child in node.children:
        result = find(child, predicate)
        if result: return result

def text(node):
    return node if isinstance(node, str) else ''.join(text(c) for c in node.children)

def literal(value): return json.dumps(value, ensure_ascii=False)

names = {'class':'className','tabindex':'tabIndex','fetchpriority':'fetchPriority','stroke-width':'strokeWidth','stroke-linecap':'strokeLinecap','stroke-linejoin':'strokeLinejoin','viewbox':'viewBox','for':'htmlFor','colspan':'colSpan','rowspan':'rowSpan','datetime':'dateTime'}

def jsx(node, special=True):
    if isinstance(node,str): return '{' + literal(node) + '}' if node else ''
    attrs = node.attrs
    children = lambda: '\n'.join(jsx(c, special) for c in node.children)
    if special:
        if 'data-service' in attrs:
            props = ' service={' + literal(attrs['data-service']) + '}'
            for name in ('href','class'):
                if name in attrs: props += ' ' + names.get(name,name) + '={' + literal(attrs[name]) + '}'
            return '<PreviewTrigger' + props + '>' + children() + '</PreviewTrigger>'
        if attrs.get('id') == 'meet-team':
            return '<FindTherapistButton className=' + literal(attrs['class']) + '>' + children() + '</FindTherapistButton>'
        if node.tag == 'header': return '<HeaderFrame>' + children() + '</HeaderFrame>'
        if attrs.get('class') == 'mobile-toggle': return '<MobileToggle />'
        if attrs.get('id') == 'navigation': return '<Navigation>' + children() + '</Navigation>'
        if attrs.get('class') == 'nav-item':
            trigger = next(c for c in node.children if isinstance(c,Element) and c.tag == 'button')
            panel = next(c for c in node.children if isinstance(c,Element) and c.tag == 'div')
            label = ''.join(jsx(c) for c in trigger.children)
            return '<NavMenu id=' + literal(panel.attrs['id']) + ' panelClassName=' + literal(panel.attrs['class']) + ' label={<>' + label + '</>}>' + ''.join(jsx(c) for c in panel.children) + '</NavMenu>'
        if attrs.get('class') == 'team-carousel':
            track = find(node,lambda n:n.attrs.get('id')=='team-track')
            return '<TeamCarousel>' + ''.join(jsx(c) for c in track.children) + '</TeamCarousel>'
    props = ''
    for name,value in attrs.items():
        if name=='style':
            style = {}
            for item in value.split(';'):
                if ':' not in item: continue
                key,val = item.split(':',1)
                parts = key.strip().split('-')
                key = parts[0]+''.join(p.title() for p in parts[1:])
                style[key] = val.strip()
            props += ' style={' + literal(style) + '}'
        else:
            props += ' ' + names.get(name,name) + ('={true}' if value is None else '={' + literal(value) + '}')
    if node.tag in VOID: return '<'+node.tag+props+' />'
    return '<'+node.tag+props+'>'+children()+'</'+node.tag+'>'

def write(path, content):
    path = Path(path)
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(content+'\n',encoding='utf8')

root = Parser(Path('legacy/public/index.html').read_text(encoding='utf8')).root
header = find(root,lambda n:n.tag=='header')
footer = find(root,lambda n:n.tag=='footer')
write('components/header.tsx', '''import { HeaderFrame, MobileToggle, Navigation, NavMenu } from "./navigation";
import { TeamCarousel } from "./team-carousel";
import { PreviewTrigger } from "./site-interactions";
export function Header() { return (''' + jsx(header) + '); }')
footer_jsx = jsx(footer).replace('id={"location"}', 'id={id}',1)
write('components/footer.tsx', 'export function Footer({ id = "location" }: { id?: string }) { return (' + footer_jsx + '); }')

sections = ['Hero','InsuranceCarousel','Services','Faith','TherapistsAndLocation','NextSteps']
home_main = find(root,lambda n:n.tag=='main')
actual = [n for n in home_main.children if isinstance(n,Element)]
assert len(actual)==len(sections)
for name,node in zip(sections,actual):
    if name=='InsuranceCarousel': continue
    imports = ''
    markup = jsx(node)
    if '<PreviewTrigger' in markup: imports += 'import { PreviewTrigger } from "../site-interactions";\n'
    if '<FindTherapistButton' in markup: imports += 'import { FindTherapistButton } from "../site-interactions";\n'
    write('components/home/'+name+'.tsx',imports+'export function '+name+'() { return ('+markup+'); }')

routes=[]
for file in sorted(Path('legacy/public').rglob('*.html')):
    doc=Parser(file.read_text(encoding='utf8')).root
    route='/' + file.relative_to('legacy/public').as_posix().removesuffix('index.html')
    routes.append(route)
    if route=='/children-families/': continue
    page_header=find(doc,lambda n:n.tag=='header')
    assert jsx(page_header)==jsx(header), f'Header differs: {route}'
    page_footer=find(doc,lambda n:n.tag=='footer')
    footer_id=page_footer.attrs['id']
    page_footer.attrs['id']='location'
    assert jsx(page_footer)==jsx(footer), f'Footer differs: {route}'
    head=find(doc,lambda n:n.tag=='head')
    title=text(find(head,lambda n:n.tag=='title'))
    description=find(head,lambda n:n.attrs.get('name')=='description').attrs['content']
    styles=[n.attrs['href'] for n in head.children if isinstance(n,Element) and n.tag=='link' and n.attrs.get('rel')=='stylesheet']
    imports='import type { Metadata } from "next";\nimport { SiteShell } from "@/components/site-shell";\n'
    if route=='/':
        imports+='import { HomepageMain } from "@/components/home/homepage-main";\n'
        for name in sections:
            source='@/components/insurance-carousel' if name=='InsuranceCarousel' else '@/components/home/'+name
            imports+='import { '+name+' } from '+literal(source)+';\n'
        markup='<HomepageMain>'+''.join('<'+name+' />' for name in sections)+'</HomepageMain>'
    else:
        markup=jsx(find(doc,lambda n:n.tag=='main'))
        if '<PreviewTrigger' in markup: imports+='import { PreviewTrigger } from "@/components/site-interactions";\n'
    metadata='export const metadata: Metadata = '+literal({'title':title,'description':description})+';\n'
    write('app'+route+'page.tsx',imports+metadata+'export default function Page() { return (<SiteShell styles={'+literal(styles)+'} footerId='+literal(footer_id)+'>'+markup+'</SiteShell>); }')
write('legacy/routes.json',literal(routes))
print(f'Converted {len(routes)-1} pages to JSX; redirect configured separately.')
