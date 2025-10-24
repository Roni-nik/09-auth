// import { fetchNoteById } from "@/lib/api/clientApi";
// import NotePreviewModal from "./NotePreview.client";
// import { QueryClient, dehydrate } from "@tanstack/react-query";

// type Props = {
//   params: { id: string };
// };

// // const NotePreview = async ({ params }: Props) => {
// //   const queryClient = new QueryClient();
// //   const { id } =  params;
// //   await queryClient.prefetchQuery({
// //     queryKey: ["note", id],
// //     queryFn: () => fetchNoteById(id),
// //   });
// export default async function NotePreview({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const queryClient = new QueryClient();
//   const { id } = params;

//   await queryClient.prefetchQuery({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//   });

//   const dehydratedState = dehydrate(queryClient);

//   return <NotePreviewModal dehydratedState={dehydratedState} />;
// };

// export default NotePreview;

import { fetchNoteById } from "@/lib/api/clientApi";
import NotePreviewModal from "./NotePreview.client";
import { QueryClient, dehydrate } from "@tanstack/react-query";

export default async function NotePreview({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();
  const { id } = params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return <NotePreviewModal dehydratedState={dehydratedState} />;
}
