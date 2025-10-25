"use client";

import css from "./Notes.client.module.css";
import { useState, useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes, NoteSearchResponse } from "@/lib/api/clientApi";
import { showErrorToast } from "@/components/ShowErrorToast/ShowError";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";


import Loader from "@/components/Loader/Loader";
import Link from "next/link";

type NoteClientProps = {
  tag: string;
  initialData?: NoteSearchResponse; 
};

export default function NotesClient({ tag, initialData }: NoteClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  


  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    updateSearchQuery(value);
  };
  const queryTag = tag === "All" ? undefined : tag;
  const search = inputValue.trim();
  

  const { data, isLoading, isSuccess, isError } = useQuery<NoteSearchResponse>({
    queryKey: ["notes", search, queryTag, currentPage],
    queryFn: () =>
      fetchNotes({
        searchQuery: search,
        tag: queryTag,
        page: currentPage,
      }),
    initialData
  });
  
  const totalPages = data?.totalPages || 0;

  const noNotesToastShown = useRef(false);

  const successContent = isSuccess && data?.notes?.length > 0 && (
    
    
    <NoteList notes={data.notes} />
  );

  const loadingContent = isLoading && <Loader />;

  useEffect(() => {
    if (isError) {
      showErrorToast("Something went wrong while fetching notes.");
    }
  }, [isError]);

  useEffect(() => {
    if (!isLoading && data && data.notes.length === 0) {
      if (!noNotesToastShown.current) {
        showErrorToast("No notes found for your request.");
        noNotesToastShown.current = true;
      }
    } else {
      noNotesToastShown.current = false;
    }
  }, [data, isLoading]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, tag]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={handleInputChange} value={inputValue} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
          <Link className={css.button} href="/notes/action/create">
          Create note
        </Link>
      </header>
      {loadingContent}
      {successContent}
    </div>
  );
}

