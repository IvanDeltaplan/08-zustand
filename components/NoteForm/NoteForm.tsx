// components/NoteForm/NoteForm.tsx
"use client";

import { FormEvent, useEffect, useState } from "react";
import { createNote } from "@/lib/api";
import { useNoteStore, initialDraft } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

const NOTE_TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;
type NoteTag = (typeof NOTE_TAGS)[number];

type NoteFormProps = {
  onSuccess?: () => void; // вызываем после успешного создания
  onCancel?: () => void;  // вызываем при Cancel
};

export default function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const { draft, setDraft, clearDraft } = useNoteStore();

  const [title, setTitle] = useState(draft.title ?? initialDraft.title);
  const [content, setContent] = useState(
    draft.content ?? initialDraft.content
  );
  const [tag, setTag] = useState<NoteTag>(
    (draft.tag as NoteTag) ?? (initialDraft.tag as NoteTag)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // сохраняем черновик при любом изменении
  useEffect(() => {
    setDraft({ title, content, tag });
  }, [title, content, tag, setDraft]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await createNote({ title, content, tag });

      clearDraft();          // черновик очистили
      onSuccess?.();         // даём странице знать, что всё ок
    } catch (error) {
      console.error("Failed to create note", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    // черновик НЕ трогаем
    onCancel?.();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={tag}
          onChange={(e) => setTag(e.target.value as NoteTag)}
        >
          {NOTE_TAGS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancelClick}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
