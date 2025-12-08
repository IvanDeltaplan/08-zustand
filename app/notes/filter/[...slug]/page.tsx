// app/notes/filter/[...slug]/page.tsx
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

const PER_PAGE = 12;

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;

  // тег из URL: /notes/filter/Todo, /notes/filter/all
  const tagFromUrl = slug?.[0] ?? "all";

  const queryClient = new QueryClient();

  const page = 1;
  const search = "";

  // префетчим данные для NotesClient
  await queryClient.prefetchQuery({
    queryKey: ["notes", { page, search, tag: tagFromUrl }],
    queryFn: () =>
      fetchNotes({
        search: search || undefined,
        page,
        perPage: PER_PAGE,
        sortBy: "created",
        // бекенд не ждёт "all" → не передаём тег
        tag: tagFromUrl === "all" ? undefined : tagFromUrl,
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient tag={tagFromUrl} />
    </HydrationBoundary>
  );
}
