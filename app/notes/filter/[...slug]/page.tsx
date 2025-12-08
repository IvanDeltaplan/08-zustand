import NotesClient from "./Notes.client";

export default async function FilterPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;        
  const tag = slug?.[0] ?? "all";

  return <NotesClient tag={tag} />;
}
