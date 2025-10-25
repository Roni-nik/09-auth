
import { fetchNoteById } from "@/lib/api/clientApi";
import NotePreviewModal from "./NotePreview.client";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export default async function NotePreview(params: Promise<{ id: string }>) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return <NotePreviewModal dehydratedState={dehydratedState} />;
}
