import { mockLongNoteOne, mockLongNoteTwo, mockShortNoteOne, mockShortNoteTwo } from "../mocks/notes";
import { GetNotesResponse } from "./types";

export const searchNotes = async ({
  searchQuery
}: {
  searchQuery: string,
}): Promise<GetNotesResponse> => {
  const mockNotes = [
    mockShortNoteOne,
    mockShortNoteTwo,
    mockLongNoteOne,
    mockLongNoteTwo,
  ];
  return mockNotes;
};

export  const makeNewNote = async ({
  title,
  body
}: {
  title: string,
  body: string,
}) => {
  //
};

export const editNote = async ({
  noteId,
  title,
  body
}: {
  noteId: number,
  title: string,
  body: string,
}) => {
  //
};

export const deleteNote = async ({
  noteId,
}: {
  noteId: number,
}) => {
  //
};
