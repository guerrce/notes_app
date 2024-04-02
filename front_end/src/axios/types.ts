export type NoteEntity = {
  id: number;
  title: string;
  body: string;
};

export type GetNotesResponse = NoteEntity[];

export type MakeNewNoteResponse = NoteEntity;

export type EditNoteResponse = NoteEntity;

export type DeleteNoteResponse = {id: number};
