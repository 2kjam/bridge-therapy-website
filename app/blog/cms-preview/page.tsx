import { notFound, redirect } from "next/navigation";
import { previewEnabled } from "@/lib/babylovegrowth/client";
export const dynamic = "force-dynamic";
export default function OldCmsIndex() {
  if (!previewEnabled(process.env)) notFound();
  redirect("/blog/");
}
