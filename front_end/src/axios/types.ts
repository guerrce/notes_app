export type NoteEntity = {
  id: number;
  title: string;
  body: string;
};

export type GetNotesResponse = NoteEntity[];
