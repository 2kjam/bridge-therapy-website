import { notFound, redirect } from "next/navigation";
import { previewEnabled } from "@/lib/babylovegrowth/client";
export const dynamic = "force-dynamic";
export default async function OldCmsArticle({params}: {params: Promise<{slug:string}>}) {
  if (!previewEnabled(process.env)) notFound();
  const {slug} = await params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) notFound();
  redirect(`/blog/${slug}/`);
}
