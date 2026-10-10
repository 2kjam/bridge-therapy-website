export type TherapistSchemaRecord = {
  path: string;
  name: string;
  credential: string;
  image: string;
  role?: string;
};

export type ServiceSchemaRecord = {
  path: string;
  name: string;
  description: string;
  therapists: string[];
  statewideTelehealth?: boolean;
};

export const therapists: TherapistSchemaRecord[] = [
  {
    path: "/therapists/alyxandrah-white/",
    name: "Alyxandrah White, LMFT",
    credential: "Licensed Marriage and Family Therapist",
    role: "LMFT, C-DBT",
    image: "/assets/alyx.jpg",
  },
  {
    path: "/therapists/denise-santos/",
    name: "Denise Santos, LPC",
    credential: "Licensed Professional Counselor",
    image: "/assets/denise.jpg",
  },
  {
    path: "/therapists/erin-young/",
    name: "Erin Young, LCSW-S",
    credential: "Licensed Clinical Social Worker–Supervisor",
    role: "Co-owner",
    image: "/assets/erin.jpg",
  },
  {
    path: "/therapists/jennifer-wood/",
    name: "Jennifer Wood, LPC-S",
    credential: "Licensed Professional Counselor–Supervisor",
    role: "Co-owner",
    image: "/assets/jennifer.jpg",
  },
  {
    path: "/therapists/jill-kirkley/",
    name: "Jill Kirkley, LPC",
    credential: "Licensed Professional Counselor",
    image: "/assets/jill.jpg",
  },
  {
    path: "/therapists/kelley-bell/",
    name: "Kelley Bell, LPC",
    credential: "Licensed Professional Counselor",
    image: "/assets/kelley.jpg",
  },
  {
    path: "/therapists/kim-gonzales/",
    name: "Kim Gonzales, LMSW",
    credential: "Licensed Master Social Worker",
    role: "Supervised by Erin Young, LCSW-S",
    image: "/assets/kim.jpg",
  },
  {
    path: "/therapists/misty-shultz/",
    name: "Misty Shultz, LPC",
    credential: "Licensed Professional Counselor",
    image: "/assets/misty.jpg",
  },
  {
    path: "/therapists/sarah-bell/",
    name: "Sarah Bell, LPC-A",
    credential: "Licensed Professional Counselor Associate",
    role: "Supervised by Whitney Briggs, LPC-S",
    image: "/assets/sarah-bell.jpg",
  },
  {
    path: "/therapists/sarah-critzman/",
    name: "Sarah Critzman, LMSW",
    credential: "Licensed Master Social Worker",
    role: "Supervised by Christi Lawson, LCSW-S",
    image: "/assets/sarah-critzman.jpg",
  },
];

export const services: ServiceSchemaRecord[] = [
  {
    path: "/adhd-counseling-tyler/",
    name: "ADHD Counseling & Support",
    description:
      "ADHD counseling and support in Tyler, Texas. Meet Bridge counselors and explore support for attention, routines, and relationships.",
    therapists: ["/therapists/erin-young/", "/therapists/sarah-bell/"],
  },
  {
    path: "/adoption-counseling-tyler/",
    name: "Adoption & Foster Family Support",
    description:
      "Adoption counseling and foster family support in Tyler, Texas for family adjustment, relationships, and parent support.",
    therapists: ["/therapists/erin-young/", "/therapists/kim-gonzales/"],
  },
  {
    path: "/anxiety-counseling-tyler/",
    name: "Anxiety Counseling",
    description:
      "Christian anxiety counseling at The Bridge in Tyler, Texas, with support for worry and stress.",
    therapists: ["/therapists/erin-young/", "/therapists/jill-kirkley/"],
  },
  {
    path: "/child-teen-counseling-tyler/",
    name: "Child & Teen Counseling",
    description:
      "Child and teen counseling at The Bridge in Tyler, Texas for emotional, behavioral, and school-related concerns.",
    therapists: ["/therapists/denise-santos/", "/therapists/kelley-bell/"],
  },
  {
    path: "/christian-counseling-tyler/",
    name: "Christian Counseling",
    description:
      "Christian counseling in Tyler, Texas, with a faith-centered approach tailored to each client's needs and preferences.",
    therapists: ["/therapists/jennifer-wood/", "/therapists/jill-kirkley/"],
  },
  {
    path: "/depression-counseling-tyler/",
    name: "Depression Counseling",
    description:
      "Christian depression counseling at The Bridge in Tyler, Texas.",
    therapists: ["/therapists/jennifer-wood/", "/therapists/denise-santos/"],
  },
  {
    path: "/divorce-blended-family-counseling-tyler/",
    name: "Divorce & Blended Family Counseling",
    description:
      "Counseling in Tyler, Texas for separation, co-parenting, and changing family roles.",
    therapists: ["/therapists/alyxandrah-white/", "/therapists/jennifer-wood/"],
  },
  {
    path: "/emdr-therapy-tyler/",
    name: "EMDR Therapy",
    description:
      "EMDR therapy at The Bridge in Tyler, Texas with trained counselors.",
    therapists: ["/therapists/erin-young/", "/therapists/sarah-bell/"],
  },
  {
    path: "/family-counseling-tyler/",
    name: "Family Counseling",
    description:
      "Family counseling in Tyler, Texas for communication, family conflict, co-parenting, and life changes.",
    therapists: ["/therapists/alyxandrah-white/", "/therapists/jennifer-wood/"],
  },
  {
    path: "/grief-counseling-tyler/",
    name: "Grief & Bereavement Counseling",
    description:
      "Grief and bereavement counseling at The Bridge in Tyler, Texas for support after loss.",
    therapists: ["/therapists/jennifer-wood/", "/therapists/erin-young/"],
  },
  {
    path: "/individual-counseling-tyler/",
    name: "Individual Counseling",
    description:
      "Individual counseling in Tyler, Texas for anxiety, depression, grief, relationships, and life changes.",
    therapists: ["/therapists/jennifer-wood/", "/therapists/denise-santos/"],
  },
  {
    path: "/life-transitions-counseling-tyler/",
    name: "Life Transitions Counseling",
    description:
      "Life transitions counseling in Tyler, Texas for adjustment difficulties, changing roles, and unexpected events.",
    therapists: ["/therapists/jill-kirkley/", "/therapists/denise-santos/"],
  },
  {
    path: "/marriage-counseling-tyler/",
    name: "Marriage & Couples Counseling",
    description:
      "Christian marriage and couples counseling at The Bridge in Tyler, Texas.",
    therapists: ["/therapists/alyxandrah-white/", "/therapists/kelley-bell/"],
  },
  {
    path: "/non-epileptic-seizures-counseling-tyler/",
    name: "Non-Epileptic Seizures Counseling Support",
    description:
      "Counseling support for Non-Epileptic Seizures with Erin Young, LCSW-S at The Bridge in Tyler, Texas.",
    therapists: ["/therapists/erin-young/"],
  },
  {
    path: "/online-therapy-texas/",
    name: "Online Therapy & Telehealth Counseling",
    description:
      "Telehealth counseling for eligible clients across Texas through The Bridge Therapeutic Services.",
    therapists: [],
    statewideTelehealth: true,
  },
  {
    path: "/parenting-support-tyler/",
    name: "Parenting Support",
    description:
      "Counseling support in Tyler, Texas for parenting stress, communication, changing roles, and co-parenting.",
    therapists: ["/therapists/kelley-bell/", "/therapists/alyxandrah-white/"],
  },
  {
    path: "/pregnancy-postpartum-counseling-tyler/",
    name: "Pregnancy & Postpartum Counseling",
    description:
      "Pregnancy and postpartum counseling at The Bridge in Tyler, Texas for emotional support and changing family roles.",
    therapists: [],
  },
  {
    path: "/premarital-counseling-tyler/",
    name: "Premarital & Marital Enrichment Counseling",
    description:
      "Christian premarital and marital enrichment counseling in Tyler, Texas for expectations, communication, and shared goals.",
    therapists: ["/therapists/alyxandrah-white/", "/therapists/kelley-bell/"],
  },
  {
    path: "/trauma-therapy-tyler/",
    name: "Trauma & PTSD Counseling",
    description:
      "Trauma and PTSD counseling at The Bridge in Tyler, Texas, including the option to discuss EMDR with a trained counselor.",
    therapists: ["/therapists/erin-young/", "/therapists/sarah-bell/"],
  },
];
