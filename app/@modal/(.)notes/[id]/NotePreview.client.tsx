// app/@modal/(.)notes/[id]/NotePreview.client.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";
import type { Note } from "@/types/note";

export default function NotePreview() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: note, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],              // 👈 тот же ключ, что и в prefetchQuery
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return null;
  if (isError || !note) return null;

  const created = new Date(note.createdAt).toLocaleString();
  const updated = note.updatedAt
    ? new Date(note.updatedAt).toLocaleString()
    : null;

  return (
    <div className={css.container}>
      <button className={css.backBtn} onClick={handleClose}>
        ← Back
      </button>

      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag}>{note.tag}</span>
        </div>

        <div className={css.content}>{note.content}</div>

        <div className={css.date}>
          <div>Created: {created}</div>
          {updated && <div>Updated: {updated}</div>}
        </div>
      </div>
    </div>
  );
}
