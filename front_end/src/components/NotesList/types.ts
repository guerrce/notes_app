export type NoteProps = {
  id: string,
  title: string,
  body: string,
  expanded: boolean;
};

export interface NotesListProps {
  notes: NoteProps[];
  onExpandNote: (noteId: string) => void;
  onEditNote: (noteId: string) => void;
  onDeleteNote: (noteId: string) => void;
}
