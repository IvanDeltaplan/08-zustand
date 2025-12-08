"use client";

import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const created = new Date(note.createdAt).toLocaleString();
  const updated = note.updatedAt
    ? new Date(note.updatedAt).toLocaleString()
    : null;

  return (
    <Modal onClose={handleClose}>
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
    </Modal>
  );
}
