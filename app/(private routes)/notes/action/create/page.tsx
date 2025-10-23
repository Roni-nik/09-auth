import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description:
    "Write and organize your thoughts in a new note. Add a title, content, and choose the right tag to keep everything structured.",
  openGraph: {
    title: "Create Note | NoteHub",
    description:
      "Easily create and manage your notes in NoteHub. Add titles, write content, and sort by tags to keep your work tidy and accessible.",
    url: "https://notehub.com/notes/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note",
      },
    ],
    type: "website",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {<NoteForm />}
      </div>
    </main>
  );
}