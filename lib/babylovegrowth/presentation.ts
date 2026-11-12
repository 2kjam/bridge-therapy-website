import type { BlogArticle } from "babylovegrowth-next-js-blog";

// These presentation overrides do not alter the vendor content or publish drafts.
const reviewedMetadata = [
  {
    id: 1089880,
    slug: "adjustment-disorder-therapy",
    title: "Adjustment Disorder Therapy: What to Expect | The Bridge",
    description: "Learn how adjustment disorder therapy supports coping with stressful changes, what treatment involves, and counseling options in Tyler, TX and across Texas.",
  },
  {
    id: 1096084,
    slug: "how-much-does-therapy-cost-in-texas",
    title: "How Much Does Therapy Cost in Texas? | The Bridge",
    description: "Understand private-pay therapy costs, insurance copays and deductibles, and Good Faith Estimates. Learn what to ask before booking counseling in Tyler, TX.",
  },
  {
    id: 1083766,
    slug: "christian-grief-counseling",
    title: "Christian Grief Counseling: What to Expect | The Bridge",
    description: "Learn how Christian grief counseling combines faith and evidence-based care, what sessions involve, and how to find support in Tyler, TX and across Texas.",
  },
  {
    id: 1086181,
    slug: "marriage-communication-problems",
    title: "Marriage Communication Problems: How to Help | The Bridge",
    description: "Explore common marriage communication patterns, practical ways to listen and resolve conflict, and when to seek couples counseling in Tyler, TX.",
  },
];

export function stagingArticleMetadata(article: Pick<BlogArticle, "id" | "slug" | "title" | "meta_description">) {
  const reviewed = reviewedMetadata.find(item => item.id === article.id && item.slug === article.slug);
  return reviewed ?? { title: `${article.title} | The Bridge`, description: article.meta_description };
}
