import type { BlogPost } from "@/lib/blog";
import { PRODUCTION_ORIGIN, canonicalUrl } from "./policy";
import { services, therapists } from "./schema-data";

type JsonValue = string | number | boolean | null | JsonObject | JsonValue[];
export type JsonObject = { [key: string]: JsonValue };

export const ORGANIZATION_ID = `${PRODUCTION_ORIGIN}/#organization`;
export const WEBSITE_ID = `${PRODUCTION_ORIGIN}/#website`;

export function assetUrl(path: string): string {
  if (!/^\/assets\/[a-z0-9][a-z0-9._/-]*$/i.test(path) || path.includes("..")) {
    throw new Error(`Invalid structured-data asset path: ${path}`);
  }
  return PRODUCTION_ORIGIN + path;
}

export function personId(path: string): string {
  return `${canonicalUrl(path)}#person`;
}

function breadcrumb(items: Array<{ name: string; path?: string }>): JsonObject {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl(items.at(-1)?.path ?? "/")}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path && index < items.length - 1
        ? { item: canonicalUrl(item.path) }
        : {}),
    })),
  };
}

function webpage(
  path: string,
  name: string,
  type: string | string[] = "WebPage",
): JsonObject {
  return {
    "@type": type,
    "@id": `${canonicalUrl(path)}#webpage`,
    url: canonicalUrl(path),
    name,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
  };
}

export function businessEntity(): JsonObject {
  return {
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORGANIZATION_ID,
    name: "The Bridge Therapeutic Services",
    url: `${PRODUCTION_ORIGIN}/`,
    logo: {
      "@type": "ImageObject",
      "@id": `${PRODUCTION_ORIGIN}/#logo`,
      url: assetUrl("/assets/logo.png"),
      contentUrl: assetUrl("/assets/logo.png"),
      width: 600,
      height: 154,
    },
    image: { "@id": `${PRODUCTION_ORIGIN}/#logo` },
    telephone: "+1-903-283-8729",
    email: "info@thebridgetherapy.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3800 Paluxy Drive, Suite 240, Building 2",
      addressLocality: "Tyler",
      addressRegion: "TX",
      postalCode: "75703",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
  };
}

function personNode(path: string): JsonObject {
  const person = therapists.find((entry) => entry.path === path);
  if (!person) throw new Error(`Unknown therapist schema path: ${path}`);
  return {
    "@type": "Person",
    "@id": personId(path),
    name: person.name,
    url: canonicalUrl(path),
    image: assetUrl(person.image),
    jobTitle: person.credential,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: person.credential,
      credentialCategory: "Professional credential",
    },
    worksFor: { "@id": ORGANIZATION_ID },
    ...(person.role === "Co-owner"
      ? {
          description: `Co-owner and ${person.credential} at The Bridge Therapeutic Services`,
        }
      : {}),
    ...(path === "/therapists/erin-young/"
      ? {
          alumniOf: [
            {
              "@type": "CollegeOrUniversity",
              name: "University of North Texas",
            },
            { "@type": "CollegeOrUniversity", name: "Temple University" },
          ],
        }
      : {}),
  };
}

function serviceNode(path: string): JsonObject {
  const service = services.find((entry) => entry.path === path);
  if (!service) throw new Error(`Unknown service schema path: ${path}`);
  return {
    "@type": "Service",
    "@id": `${canonicalUrl(path)}#service`,
    name: service.name,
    description: service.description,
    url: canonicalUrl(path),
    serviceType: service.name,
    provider: [
      { "@id": ORGANIZATION_ID },
      ...service.therapists.map((therapist) => ({
        "@id": personId(therapist),
      })),
    ],
    areaServed: service.statewideTelehealth
      ? { "@type": "AdministrativeArea", name: "Texas" }
      : { "@type": "City", name: "Tyler, Texas" },
  };
}

export function staticPageSchema(path: string): JsonObject {
  if (path === "/") {
    const page = webpage(path, "The Bridge Therapeutic Services");
    page.mainEntity = { "@id": ORGANIZATION_ID };
    return {
      "@context": "https://schema.org",
      "@graph": [
        businessEntity(),
        {
          "@type": "WebSite",
          "@id": WEBSITE_ID,
          url: `${PRODUCTION_ORIGIN}/`,
          name: "The Bridge Therapeutic Services",
          publisher: { "@id": ORGANIZATION_ID },
        },
        page,
      ],
    };
  }

  const service = services.find((entry) => entry.path === path);
  if (service) {
    const page = webpage(path, service.name);
    page.mainEntity = { "@id": `${canonicalUrl(path)}#service` };
    page.breadcrumb = { "@id": `${canonicalUrl(path)}#breadcrumb` };
    return {
      "@context": "https://schema.org",
      "@graph": [
        page,
        serviceNode(path),
        breadcrumb([
          { name: "Home", path: "/" },
          { name: service.name, path },
        ]),
      ],
    };
  }

  const therapist = therapists.find((entry) => entry.path === path);
  if (therapist) {
    const page = webpage(path, therapist.name, "ProfilePage");
    page.mainEntity = { "@id": personId(path) };
    page.breadcrumb = { "@id": `${canonicalUrl(path)}#breadcrumb` };
    return {
      "@context": "https://schema.org",
      "@graph": [
        page,
        personNode(path),
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Our Therapists", path: "/therapists/" },
          { name: therapist.name, path },
        ]),
      ],
    };
  }

  if (path === "/about/" || path === "/contact/") {
    const type = path === "/about/" ? "AboutPage" : "ContactPage";
    const name = path === "/about/" ? "About The Bridge" : "Contact The Bridge";
    const page = webpage(path, name, type);
    page.mainEntity = { "@id": ORGANIZATION_ID };
    page.breadcrumb = { "@id": `${canonicalUrl(path)}#breadcrumb` };
    return {
      "@context": "https://schema.org",
      "@graph": [
        page,
        breadcrumb([
          { name: "Home", path: "/" },
          { name, path },
        ]),
      ],
    };
  }

  if (path === "/therapists/") {
    const page = webpage(path, "Our Therapists", "CollectionPage");
    page.mainEntity = {
      "@type": "ItemList",
      "@id": `${canonicalUrl(path)}#therapists`,
      numberOfItems: therapists.length,
      itemListElement: therapists.map((therapist, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@id": personId(therapist.path) },
      })),
    };
    page.breadcrumb = { "@id": `${canonicalUrl(path)}#breadcrumb` };
    return {
      "@context": "https://schema.org",
      "@graph": [
        page,
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Our Therapists", path },
        ]),
      ],
    };
  }

  if (path === "/staff/kalynne-arrick/") {
    const page = webpage(path, "Kalynne Arrick, Office Manager", "ProfilePage");
    page.mainEntity = { "@id": `${canonicalUrl(path)}#person` };
    page.breadcrumb = { "@id": `${canonicalUrl(path)}#breadcrumb` };
    return {
      "@context": "https://schema.org",
      "@graph": [
        page,
        {
          "@type": "Person",
          "@id": `${canonicalUrl(path)}#person`,
          name: "Kalynne Arrick",
          url: canonicalUrl(path),
          image: assetUrl("/assets/kalynne.jpg"),
          jobTitle: "Office Manager",
          worksFor: { "@id": ORGANIZATION_ID },
        },
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Kalynne Arrick", path },
        ]),
      ],
    };
  }

  if (path === "/blog/") {
    const page = webpage(path, "Blog", ["CollectionPage", "Blog"]);
    page.publisher = { "@id": ORGANIZATION_ID };
    page.breadcrumb = { "@id": `${canonicalUrl(path)}#breadcrumb` };
    return {
      "@context": "https://schema.org",
      "@graph": [
        page,
        breadcrumb([
          { name: "Home", path: "/" },
          { name: "Blog", path },
        ]),
      ],
    };
  }

  throw new Error(`No structured-data schema for static path: ${path}`);
}

export function articleSchema(post: BlogPost): JsonObject {
  const path = post.legacyPath.endsWith("/")
    ? post.legacyPath
    : `${post.legacyPath}/`;
  const url = canonicalUrl(path);
  const author: JsonObject =
    post.authorType === "Organization"
      ? { "@id": ORGANIZATION_ID }
      : post.authorProfilePath
        ? { "@id": personId(post.authorProfilePath) }
        : { "@type": "Person", name: post.displayedByline };
  const posting: JsonObject = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    ...(post.publicationDate ? { datePublished: post.publicationDate } : {}),
    ...(post.authorType === "Organization"
      ? { description: post.seo.description }
      : {}),
    mainEntityOfPage: { "@id": `${url}#webpage` },
    url,
    author,
    publisher: { "@id": ORGANIZATION_ID },
    ...(post.featuredImage ? { image: assetUrl(post.featuredImage.src) } : {}),
  };
  const page = webpage(path, post.title);
  page.mainEntity = { "@id": `${url}#article` };
  page.breadcrumb = { "@id": `${url}#breadcrumb` };
  return {
    "@context": "https://schema.org",
    "@graph": [
      page,
      posting,
      breadcrumb([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog/" },
        { name: post.title, path },
      ]),
    ],
  };
}
