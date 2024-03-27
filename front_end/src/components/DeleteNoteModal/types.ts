export interface DeleteNoteModalProps {
  open: boolean;
  noteTitle: string;
  error?: boolean;
  deleteSuccess?: boolean;
  loading?: boolean;
  onDelete: () => void;
  onClose: () => void;
};
