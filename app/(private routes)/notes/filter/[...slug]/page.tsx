// import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
// // import { fetchNotes } from "@/lib/api/clientApi";

import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { fetchNotesServer, NoteSearchResponse } from "@/lib/api/serverApi";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = (await params).slug?.[0] || "All";
  const selectedTag = tag === "All" ? "All" : tag;

  return {
    title: `Notes tag: ${selectedTag} | NoteHub`,
    description: `Browse all notes tagged with "${selectedTag}" on NoteHub. Discover and manage notes related to this topic.`,
    openGraph: {
      title: `Notes tag: ${selectedTag} | NoteHub`,
      description: `View and explore notes marked with the tag "${selectedTag}". Find all your content related to this category in one place.`,
      url: `https://notehub.com/notes/filter/${selectedTag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes tagged with ${selectedTag}`,
        },
      ],
      type: "website",
    },
  };
}



export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const [tag] = slug || [];
  const page = 1;

  const initialData: NoteSearchResponse = await fetchNotesServer({
    tag,
    searchQuery: "",
    page,
  })

  return <NotesClient key={tag} initialData={initialData} tag={tag} />
 

  
}
// const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["notes", { tag, page }],
  //   queryFn: () => fetchNotes({ tag, searchQuery: "", page }),
  // });

  // const dehydratedState = dehydrate(queryClient);


  // return (
  //   <HydrationBoundary state={dehydratedState}>
  //     <NotesClient tag={tag}  />
  //   </HydrationBoundary>
  // );