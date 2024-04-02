import { useState } from "react";
import { deleteNote } from "../axios/notes";
import { useGenericModal } from "./useGenericModal";

export const useDeleteNoteModal = (): {
  deleteModalOpen: boolean,
  deleteModalLoading: boolean,
  deleteModalSuccess: boolean,
  deleteModalError: boolean,
  deleteNoteId?: number,
  handleOpenDeleteModal: (noteId: number) => void,
  handleCloseDeleteModal: () => void,
  handleDelete: () => void,
} => {
  const [deleteNoteId, setDeleteNoteId] = useState<number | undefined>();

  const onSubmit = async (): Promise<string> => {
    try {
      if (deleteNoteId){
        const deleteNoteRes = await deleteNote({noteId: deleteNoteId})
        return 'success';
      } else {
        throw new Error('No note id selected');
      }
    } catch (error) {
      console.error(error);
      return 'error'
    }
  };

  const {
    open,
    loading,
    success,
    error,
    openModal,
    closeModal,
    submit
  } = useGenericModal({onSubmit});

  const handleOpenDeleteModal = (noteId: number) => {
    setDeleteNoteId(noteId);
    openModal;
  };

  const handleCloseDeleteModal = () => {
    closeModal;
    setDeleteNoteId(undefined);
  };
  
  return {
    deleteModalOpen: open,
    deleteModalLoading: loading,
    deleteModalSuccess: success,
    deleteModalError: error,
    deleteNoteId,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete: submit,
  };
};
