import { useState } from "react";
import { editNote, makeNewNote } from "../axios/notes";
import { MAX_NOTE_BODY_LENGTH, MIN_NOTE_BODY_LENGTH } from "../constants";
import { useGenericModal } from "./useGenericModal";

export const useEditNoteModal = (
  reloadNotes?: () => void
): {
  editModalTitle: string,
  editModalBody: string,
  editModalOpen: boolean,
  editModalLoading: boolean,
  editModalSuccess: boolean,
  editModalError: boolean,
  isEdit: boolean,
  charCountError: boolean;
  handleChangeTitle: (newTitle: string) => void;
  handleChangeBody: (newBody: string) => void;
  handleOpenNewNote: () => void;
  handleOpenEditNote: (noteId: number, title: string, body: string) => void,
  handleCloseEditModal: () => void,
  handleSubmit: () => void,
} => {
  const [modalNoteTitle, setModalNoteTitle] = useState<string>('');
  const [modalNoteBody, setModalNoteBody] = useState<string>('');
  const [noteId, setNoteId] = useState<number | undefined>();
  const [charCountError, setCharCountError] = useState<boolean>(false);

  const onSubmit = async (): Promise<string | undefined> => {
    const bodyCharCount = modalNoteBody.length;
    if (MIN_NOTE_BODY_LENGTH < bodyCharCount && bodyCharCount < MAX_NOTE_BODY_LENGTH){
      try {
        if (!noteId) {
          await makeNewNote({
            title: modalNoteTitle,
            body: modalNoteBody,
          });
        } else {
          await editNote({
            noteId,
            title: modalNoteTitle,
            body: modalNoteBody,
          });
        }
        
        setModalNoteTitle('');
        setModalNoteBody('');
        setCharCountError(false);
        return 'success';
      } catch (error) {
        console.error(error);
        return 'error'
      }
    } else {
      setCharCountError(true);
      return;
    }
  };

  const {
    open,
    loading,
    success,
    error,
    openModal,
    closeModal,
    submit,
  } = useGenericModal({
    onSubmit,
    reload: reloadNotes,
  });

  const handleOpenNewNote = () => {
    setNoteId(undefined);
    openModal();
  };

  const handleOpenEditNote = (noteId: number, title: string, body: string) => {
    setNoteId(noteId);
    setModalNoteTitle(title);
    setModalNoteBody(body);
    openModal();
  };

  const handleCloseEditModal = () => {
    closeModal();
    setModalNoteTitle('');
    setModalNoteBody('');
    setCharCountError(false);
  };
  
  return {
    editModalTitle: modalNoteTitle,
    editModalBody: modalNoteBody,
    editModalOpen: open,
    editModalLoading: loading,
    editModalSuccess: success,
    editModalError: error,
    isEdit: !!noteId,
    charCountError,
    handleChangeTitle: setModalNoteTitle,
    handleChangeBody: setModalNoteBody,
    handleOpenNewNote,
    handleOpenEditNote,
    handleCloseEditModal,
    handleSubmit: submit,
  };
};
