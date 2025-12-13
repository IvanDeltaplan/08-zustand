"use client";

import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export default function CreateNote() {
  const router = useRouter();

  const handleSuccess = () => {
    // после успешного создания – назад к списку
    router.back(); 
    // или явно: router.push("/notes/filter/all");
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {/* NoteForm component */}
        <NoteForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </main>
  );
}
