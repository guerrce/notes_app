export type NoteProps = {
  id: number,
  title: string,
  body: string,
  expanded: boolean;
};

export interface NotesListProps {
  notes: NoteProps[];
  loading?: boolean;
  onExpandNote: (noteId: number) => void;
  onEditNote: (noteId: number, title: string, body: string) => void;
  onDeleteNote: (noteId: number) => void;
}
