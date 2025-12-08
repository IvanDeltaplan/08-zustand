// app/@modal/(.)notes/[id]/page.tsx
import { fetchNoteById } from "@/lib/api";
import NotePreview from "./NotePreview.client";
import type { Note } from "@/types/note";

export default async function NoteModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const note: Note = await fetchNoteById(id);

  return <NotePreview note={note} />;
}
