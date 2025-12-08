// app/@modal/(..)notes/[id]/page.tsx
import { fetchNoteById } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import type { Note } from "@/types/note";

interface NoteModalPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: NoteModalPageProps) {
  const { id } = await params;
  const note: Note = await fetchNoteById(id);

  return <NotePreview note={note} />;
}
