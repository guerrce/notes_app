export interface NoteProps {
  title: string,
  body: string,
  expanded?: boolean,
  onExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
};
