// Apply only Batch 1's approved changes to the frozen migration expectations.
// Full element/attribute/text comparisons still run for every route afterward.
import { parseFragment, serializeOuter } from "parse5";
export function expectBatchOne(doc, route) {
  const attr = (n, k) => n.attrs?.find((a) => a.name === k)?.value;
  const all = (n, p) => [
    ...(p(n) ? [n] : []),
    ...(n.childNodes ?? []).flatMap((c) => all(c, p)),
  ];
  const find = (key, value) => all(doc, (n) => attr(n, key) === value)[0];
  const html = (s) => parseFragment(s).childNodes[0];
  const text = (n, s) => {
    n.childNodes = parseFragment(s).childNodes;
  };
  const detach = (n) => {
    n.parentNode.childNodes = n.parentNode.childNodes.filter((c) => c !== n);
  };
  const append = (p, n) => {
    n.parentNode = p;
    p.childNodes.push(n);
  };
  const replace = (n, r) => {
    r.parentNode = n.parentNode;
    n.parentNode.childNodes.splice(n.parentNode.childNodes.indexOf(n), 1, r);
  };
  // Launch scope removes the footer's temporary label, preserving the reference file.
  const footer = all(doc, (n) => n.tagName === "footer")[0];
  const previewLabel = all(footer, (n) => n.tagName === "span" &&
    (n.childNodes ?? []).some((c) => c.value === "Local design preview"))[0];
  if (previewLabel) detach(previewLabel);
  const specialty =
    '<a href="/non-epileptic-seizures-counseling-tyler/">Non-Epileptic Seizures</a>';
  // The dedicated practice page replaces only the shared About destinations.
  for (const tag of ["header", "footer"]) {
    const chrome = all(doc, (n) => n.tagName === tag)[0];
    for (const link of all(chrome, (n) => n.tagName === "a" && attr(n, "href") === "/#why-the-bridge")) {
      link.attrs.find((a) => a.name === "href").value = "/about/";
    }
  }
  const care = find("id", "care-panel");
  const groups = all(care, (n) => n.tagName === "section");
  const links = all(care, (n) => n.tagName === "a");
  text(
    links.find((n) => attr(n, "href") === "/child-teen-counseling-tyler/"),
    "Children and Teens",
  );
  text(
    links.find(
      (n) =>
        attr(n, "href") === "/marriage-counseling-tyler/" &&
        n.parentNode === groups[1],
    ),
    "Relationships",
  );
  for (const href of [
    "/premarital-counseling-tyler/",
    "/pregnancy-postpartum-counseling-tyler/",
  ]) {
    const link = links.find((n) => attr(n, "href") === href);
    detach(link);
    append(groups[1], link);
  }
  append(groups[1], html(specialty));
  // The menu-only portrait wrapper clips a modest CSS zoom without changing the asset.
  const officePhoto = all(find("class", "menu-feature office-help"), n => n.tagName === "img")[0];
  const portraitFrame = html('<div class="office-help-portrait"></div>');
  replace(officePhoto, portraitFrame);
  append(portraitFrame, officePhoto);
  if (route !== "/") return;
  text(find("id", "hero-title"), "Counseling and Therapy in Tyler, TX");
  for (const n of all(
    find("class", "ivory-hero-copy"),
    (n) => n.nodeName === "#text",
  ))
    n.value = n.value.replace(
      "individuals, couples, and families",
      "individuals, couples, families, and children",
    );
  text(find("class", "hero-script"), "Heart.<br><span>Hope.</span><br>Here.");
  text(
    find("class", "hero-side-note"),
    "People grow<br>here<i></i>TYLER, TEXAS",
  );
  text(find("id", "why-title"), "Faith-informed<br> approach to therapy");
  const faith = find("class", "faith-copy");
  text(
    all(faith, (n) => n.tagName === "p" && !attr(n, "class"))[0],
    "Our counselors meet you with a Christian perspective and professional and compassionate care for your unique needs.",
  );
  detach(all(find("class", "ivory-local"), (n) => n.tagName === "figure")[0]);
  const services = find("id", "services");
  detach(all(services, (n) => attr(n, "class") === "preview-label")[0]);
  text(
    all(services, (n) => n.tagName === "p")[0],
    'We help individuals, couples, families, and children find hope, healing, and a healthier path forward. <a class="individual-counseling-link" href="/individual-counseling-tyler/">Explore individual counseling <span aria-hidden="true">&#8594;</span></a>',
  );
  const anger = find("data-service", "Anger Counseling");
  const nes = html(specialty);
  nes.parentNode = anger.parentNode;
  anger.parentNode.childNodes.splice(
    anger.parentNode.childNodes.indexOf(anger),
    0,
    nes,
  );
  for (const name of ["Counseling After Abuse", "Anger Counseling", "Codependency Counseling", "Eating Disorder Counseling"]) {
    detach(find("data-service", name));
  }
  detach(find("class", "next-script"));
  const insurance = find("id", "insurance");
  replace(
    insurance,
    html(
      '<div class="bridge-positioning"><p>Bridging Christian Counseling and Whole Health</p></div>',
    ),
  );
  const next = find("id", "getting-started");
  insurance.parentNode = next.parentNode;
  next.parentNode.childNodes.splice(
    next.parentNode.childNodes.indexOf(next),
    0,
    insurance,
  );
  const local = find("class", "ivory-local");
  detach(local);
  local.tagName = local.nodeName = "section";
  const copy = all(local, (n) => n.tagName === "div")[0];
  const details = html('<div class="local-details"></div>');
  const detailNodes = copy.childNodes.slice(copy.childNodes.findIndex(n => n.tagName === "address"));
  for (const node of detailNodes) { detach(node); append(details, node); }
  append(local, details);
  append(local, html('<span class="local-watermark" aria-hidden="true">EAST TEXAS</span>'));
  local.parentNode = next.parentNode;
  next.parentNode.childNodes.splice(next.parentNode.childNodes.indexOf(next), 0, local);
  detach(find("class", "insurance-heading"));
  insurance.attrs = insurance.attrs.filter(a => a.name !== "aria-labelledby");
  insurance.attrs.push({ name: "aria-label", value: "Insurance" });
  for (const [before, after] of [
    ["Cigna", "TRICARE"],
    ["Meritain Health", "UnitedHealthcare"],
  ])
    replace(
      all(
        insurance,
        (n) => n.tagName === "img" && attr(n, "alt") === before,
      )[0],
      html(`<span class="insurance-name">${after}</span>`),
    );
  const logoList = find("class", "insurance-logos");
  for (const item of [...logoList.childNodes].filter(
    (n) => n.tagName === "li",
  )) {
    const copy = html(serializeOuter(item));
    copy.attrs.push({ name: "data-duplicate", value: "" });
    append(logoList, copy);
  }
  const carousel = html(serializeOuter(find("class", "team-carousel")));
  carousel.attrs.find((a) => a.name === "class").value =
    "team-carousel homepage-team-carousel";
  for (const n of all(carousel, (n) => !!n.tagName)) {
    for (const a of n.attrs ?? [])
      if (
        (a.name === "id" || a.name === "aria-controls") &&
        a.value === "team-track"
      )
        a.value = "homepage-team-track";
    if (n.tagName === "img") n.attrs.push({ name: "loading", value: "lazy" });
  }
  replace(find("class", "ivory-people"), carousel);
  const team = find("class", "ivory-team");
  text(
    all(
      team,
      (n) => n.tagName === "a" && attr(n, "href") === "/therapists/",
    )[0],
    "View All Therapists",
  );
}
