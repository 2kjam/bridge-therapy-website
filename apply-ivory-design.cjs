// Applies the approved reference direction while retaining the route map and service directory.
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'public');
const original = fs.readFileSync(path.join(__dirname, 'design-backups/homepage-before-ivory.html'), 'utf8');
const directory = original.match(/<details class="specialty-directory">[\s\S]*?<\/details>/)[0]
 .replace('Browse All Counseling Specialties','View All Counseling Services')
 .replace('Specialty selections open a design preview. Individual pages and additional programs will be built next.','Some specialties are still in development. Contact our office for current services and therapist fit.');
const insurance = original.match(/<section class="insurance-strip"[\s\S]*?<\/section>/)[0];
let header = original.match(/<header class="header">[\s\S]*?<\/header>/)[0];
header = header.replace('/assets/logo.png','/assets/ivory-logo.svg').replace('width="600" height="150"','width="280" height="68"')
 .replace('<nav id="navigation" aria-label="Main navigation">','<nav id="navigation" aria-label="Main navigation"><a class="nav-direct" href="/#why-the-bridge">About</a>')
 .replace('>Counseling <span','>Counseling Services <span').replace('>About & Getting Started <span','>Resources <span')
 .replace('<a class="button header-cta"','<a class="nav-direct" href="/contact/">Contact</a><a class="button header-cta"')
 .replaceAll('href="#services"','href="/#services"');
const icon = (kind) => `<svg class="line-icon" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${{
 people:'<circle cx="20" cy="10" r="5"/><path d="M12 31v-5c0-5 3-8 8-8s8 3 8 8v5zM9 7a4 4 0 0 0 0 8M31 7a4 4 0 0 1 0 8M8 19c-4 1-6 5-6 11h6M32 19c4 1 6 5 6 11h-6"/>',
 cross:'<path d="M17 3h6v11h10v6H23v17h-6V20H7v-6h10z"/>',
 pin:'<path d="M32 15c0 10-12 22-12 22S8 25 8 15a12 12 0 0 1 24 0Z"/><circle cx="20" cy="15" r="4"/>',
 phone:'<path d="m10 5 6 8-5 5c3 6 6 9 12 12l5-5 8 6c-2 6-7 7-12 5C12 32 4 22 3 12c0-4 3-7 7-7Z"/>'
 }[kind]}</svg>`;
const cards = [
 ['Anxiety','anxiety-counseling-tyler','ivory-anxiety.jpg'],
 ['Relationships','marriage-counseling-tyler','ivory-relationships.jpg'],
 ['Trauma','trauma-therapy-tyler','ivory-trauma.jpg'],
 ['Parenting','parenting-support-tyler','ivory-parenting.jpg'],
 ['Grief & Loss','grief-counseling-tyler','ivory-grief.jpg'],
 ['Teens & Adolescents','child-teen-counseling-tyler','ivory-teen.jpg']
].map(([label,route,img],i)=>`<a class="ivory-service tile-${i}" href="/${route}/"${i===3?' id="family-services"':''}><img src="/assets/${img}" alt="" width="640" height="480" loading="lazy"><span>${label}<b aria-hidden="true">→</b></span></a>`).join('');
const people = [
 ['Jennifer Wood','LPC-S','Practice co-owner','jennifer','Jennifer%20Wood','Jennifer'],
 ['Erin Young','LCSW-S','Practice co-owner','erin','Erin%20Young','Erin'],
 ['Alyxandrah White','LMFT, C-DBT','Marriage & family therapist','alyx','Alyxandrah%20White','Alyx'],
 ['Kelley Bell','LPC','Professional counselor','kelley','Kelley%20Bell','Kelley']
].map(([name,credential,role,img,fragment,first])=>`<article class="ivory-person"><a href="https://www.thebridgetherapy.com/meet-the-team#:~:text=${fragment}"><img src="/assets/${img}.jpg" alt="${name}" width="500" height="750" loading="lazy"></a><h3>${name}, ${credential}</h3><p>${role}</p><a class="person-link" href="https://www.thebridgetherapy.com/meet-the-team#:~:text=${fragment}">Meet ${first} <span aria-hidden="true">→</span></a></article>`).join('');
const main = `<main id="main" class="ivory-home">
<section class="ivory-hero" aria-labelledby="hero-title"><img class="ivory-hero-photo" src="/assets/ivory-hero.jpg" alt="" width="2172" height="724" fetchpriority="high"><div class="ivory-hero-copy"><p class="eyebrow">COUNSELING IN TYLER, TEXAS</p><h1 id="hero-title">Real Help for<br>Real Life</h1><p>Compassionate, professional counseling for individuals, couples, and families—grounded in hope and a Christian perspective.</p><div class="ivory-actions"><a class="button" href="/contact/">Book an Appointment</a><button class="button button-outline" id="meet-team">Find a Therapist</button></div></div><p class="hero-script" aria-hidden="true">Healing<br><span>Hope</span><br>What’s Next</p><div class="hero-side-note" aria-hidden="true">PEOPLE CHANGE<br>HERE.<i></i>TYLER, TEXAS</div></section>
${insurance}
<section class="ivory-services" id="services" aria-labelledby="services-title"><h2 id="services-title">You Don’t Have to Face This Alone</h2><p>We help individuals, couples, and families find hope, healing, and a healthier path forward.</p><div class="ivory-service-grid">${cards}</div>${directory}</section>
<section class="ivory-faith" id="why-the-bridge" aria-labelledby="why-title"><div class="faith-copy"><img src="/assets/ivory-leaves.svg" class="faith-leaves" alt=""><p class="eyebrow">MORE THAN COUNSELING</p><h2 id="why-title">A Faith-Informed<br>Approach to Healing</h2><p>Our counselors bring together a Christian perspective and practical, personal support, with attention to your needs and experiences.</p><a class="button" href="/christian-counseling-tyler/">Learn More About Our Approach</a></div><div class="faith-statement"><p class="eyebrow">HOPE LOOKS DIFFERENT HERE</p><p class="faith-quote">Walking alongside you<br>with compassion, thoughtful care,<br>and hope rooted in Christ.</p><span class="small-rule"></span></div></section>
<section class="ivory-community"><div class="ivory-team" id="therapists"><h2>Meet Our Therapists</h2><p class="team-intro">Experienced. Compassionate. Here for You.</p><div class="ivory-people">${people}</div><a class="button" href="https://www.thebridgetherapy.com/meet-the-team">Meet Our Therapists</a></div><div class="ivory-local"><figure><img src="/assets/our-story.jpg" alt="Erin Young and Jennifer Wood, co-owners of The Bridge" width="1000" height="664" loading="lazy"><figcaption>Jennifer & Erin · Co-owners</figcaption></figure><div><p class="eyebrow">ROOTED IN TYLER</p><h2>Here for<br>East Texas.</h2><p>We’re honored to serve individuals, couples, and families in Tyler and throughout the East Texas community.</p><address>${icon('pin')}<span>3800 Paluxy Drive, Suite 240<br>Building 2<br>Tyler, TX 75703</span></address><a class="local-phone" href="tel:9032838729">${icon('phone')}(903) 283-8729</a><a class="local-directions" href="https://www.google.com/maps/search/?api=1&query=The+Bridge+Therapeutic+Services+3800+Paluxy+Drive+Suite+240+Tyler+TX">Get Directions <span aria-hidden="true">→</span></a></div></div></section>
<section class="ivory-next" id="getting-started"><div><h2>Take the Next Step</h2><p>It’s not always easy to reach out, but you don’t have to do this alone.<br>We’re here to help.</p><div class="ivory-actions"><a class="button" href="/contact/">Book an Appointment</a><a class="button button-outline" href="tel:9032838729">Call (903) 283-8729</a></div></div><p class="next-script" aria-hidden="true">A Stronger You<br>Brighter Tomorrows</p></section>
</main>`;
const footer = `<footer class="site-footer ivory-footer" id="location"><div class="ivory-footer-grid"><a class="footer-wordmark" href="/" aria-label="The Bridge home"><img src="/assets/ivory-logo.svg" alt="The Bridge Therapeutic Services" width="280" height="68"></a><section><h2>Counseling Services</h2><a href="/anxiety-counseling-tyler/">Anxiety</a><a href="/marriage-counseling-tyler/">Relationships</a><a href="/trauma-therapy-tyler/">Trauma</a><a href="/grief-counseling-tyler/">Grief & Loss</a><a href="/child-teen-counseling-tyler/">Teens & Adolescents</a><a href="/parenting-support-tyler/">Parenting</a><a href="/life-transitions-counseling-tyler/">Life Transitions</a></section><section><h2>Our Practice</h2><a href="/#why-the-bridge">About</a><a href="/#therapists">Our Therapists</a><a href="https://www.thebridgetherapy.com/blog">Resources</a><a href="/contact/">Contact</a><a href="/contact/">Book an Appointment</a><a href="/#insurance">Insurance</a></section><section><h2>Contact</h2><address>3800 Paluxy Drive, Suite 240<br>Building 2 · Tyler, TX 75703</address><a href="tel:9032838729">(903) 283-8729</a><a href="mailto:info@thebridgetherapy.com">info@thebridgetherapy.com</a></section></div><div class="footer-fine-print"><p>© 2026 The Bridge Therapeutic Services. All rights reserved.</p><span>Local design preview</span></div></footer>`;
let home = original.replace(/<div class="utility">[\s\S]*?<\/div>/,'').replace(/<header class="header">[\s\S]*?<\/header>/,header).replace(/<main id="main">[\s\S]*?<\/main>/,main).replace(/<footer class="site-footer"[\s\S]*?<\/footer>/,footer);
home=home.replace('</head>','<link rel="stylesheet" href="/ivory-design.css"></head>');
fs.writeFileSync(path.join(root,'index.html'),home.replace('/assets/favicon-white.svg?v=2','/assets/ivory-favicon.svg?v=3'));
for(const dir of fs.readdirSync(root,{withFileTypes:true}).filter(x=>x.isDirectory())){
 const file=path.join(root,dir.name,'index.html');if(!fs.existsSync(file))continue;
 let html=fs.readFileSync(file,'utf8');if(!html.includes('class="header"'))continue;
 html=html.replace(/<div class="utility">[\s\S]*?<\/div>/,'').replace(/<header class="header">[\s\S]*?<\/header>/,header).replace(/<footer class="site-footer"[\s\S]*?<\/footer>/,footer);
 if(!html.includes('/ivory-design.css'))html=html.replace('</head>','<link rel="stylesheet" href="/ivory-design.css"></head>');
 if(dir.name==='contact'&&!html.includes('href="/insurance.css"'))html=html.replace('</head>','<link rel="stylesheet" href="/insurance.css"></head>');
 if(dir.name==='contact')html=html.replace('<footer class="site-footer ivory-footer" id="location">','<footer class="site-footer ivory-footer" id="contact-footer">');
 fs.writeFileSync(file,html);
}
console.log('Applied reference design to homepage and shared site chrome; existing routes retained.');
