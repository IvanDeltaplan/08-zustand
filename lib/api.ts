// // lib/api.ts

// import axios from "axios";

// export type Note = {
//   id: string;
//   title: string;
//   content: string;
//   categoryId: string;
//   userId: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type NoteListResponse = {
//   notes: Note[];
//   total: number;
// };

// axios.defaults.baseURL = "https://next-v1-notes-api.goit.study";

// export const getNotes = async () => {
//   const res = await axios.get<NoteListResponse>("/notes");
//   return res.data;
// };



import axios, { type AxiosResponse } from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;



function getAuthHeaders() {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export interface FetchNotesParams {
    id?: string;
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

export interface NotesResponse {
    id: string;
  notes: Note[];
  totalPages: number;
  page?: number;
  perPage?: number;
  total?: number;
}

/** Отримати список нотаток */
export async function fetchNotes(
  params: FetchNotesParams
): Promise<NotesResponse> {
  const res: AxiosResponse<NotesResponse> = await axios.get(
    `${BASE_URL}/notes`,
    {
      headers: getAuthHeaders(),
      params,
    }
  );

  return res.data;
}

/** Пейлоад для створення нотатки */
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

/** Створити нотатку */
export async function createNote(
  
  payload: CreateNotePayload
): Promise<Note> {

   console.log("🔑 Token:", token ? "Present" : "Missing");
  console.log("📦 Payload:", payload);
  const res: AxiosResponse<Note> = await axios.post(
    `${BASE_URL}/notes`,
    payload,
    {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}

/** Видалити нотатку за id */
export async function deleteNote(id: string): Promise<Note> {
  const res: AxiosResponse<Note> = await axios.delete(
    `${BASE_URL}/notes/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return res.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  // ⬇️ без any
  const res: AxiosResponse<Note | { note: Note }> = await axios.get(
    `${BASE_URL}/notes/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  console.log("fetchNoteById response:", res.data);

  const data = res.data;

  // Підтримуємо обидва варіанти: { note: {...} } або просто {...}
  if (data && typeof data === "object" && "note" in data) {
    return (data as { note: Note }).note;
  }

  return data as Note;
}