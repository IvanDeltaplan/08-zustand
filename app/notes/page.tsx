// app/notes/page.tsx
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./filter/[...slug]/Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // SSR prefetch списку нотаток
  await queryClient.prefetchQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes({}),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient />
    </HydrationBoundary>
  );
}
