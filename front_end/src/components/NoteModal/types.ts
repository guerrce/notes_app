export interface NoteModalProps {
  open: boolean;
  isEdit?: boolean;
  noteTitle?: string;
  noteBody?: string;
  noteBodyError?: boolean;
  error?: boolean;
  submitSuccess?: boolean;
  loading?: boolean;
  onChangeTitle: (newTitle: string) => void;
  onChangeBody: (newBody: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};
