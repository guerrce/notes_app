import { useEffect, useState } from "react";
import { searchNotes } from "../axios/notes";
import { GetNotesResponse } from "../axios/types";
import { NoteProps } from "../components/NotesList";

type NotesState = {[noteId: number]: NoteProps};

const getNormalizedNotes = (notes: GetNotesResponse): NotesState => (
  notes
    .reduce((acc, note) => ({
      ...acc,
      [note.id]: {
        ...note,
        expanded: false,
      }
    }), {})
);

export const useNotes = (): {
  notes: NotesState,
  loadingNotes: boolean,
  searchValue: string,
  handleSearchChange: (newSearchValue: string) => void,
  handleClickSearch: () => void,
  handleExpandNote: (noteId: number) => void,
  reloadNotes: () => void;
} => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [notes, setNotes] = useState<NotesState>({});

  const handleSearchChange = (newSearchValue: string) => {
    setSearchQuery(newSearchValue)
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const searchResults = await searchNotes({ searchQuery });
      const newNotesState = getNormalizedNotes(searchResults);
      setNotes(newNotesState);
    } catch (error) {
      console.error(error)
      setNotes({});
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleExpandNote = (noteId: number) => {
    const note = notes[noteId];
    const previousNoteState = note.expanded;
    const newNote = {
      ...note,
      expanded: !previousNoteState
    };
    const newNotes = {
      ...notes,
      [noteId]: newNote,
    }
    setNotes(newNotes);
  };

  return {
    notes,
    loadingNotes: loading,
    searchValue: searchQuery,
    handleSearchChange,
    handleClickSearch: handleSearch,
    handleExpandNote,
    reloadNotes: handleSearch,
  };
};
