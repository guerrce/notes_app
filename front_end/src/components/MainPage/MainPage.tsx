import { Button } from '@mui/material';
import React, { FC } from 'react';
import { useDeleteNoteModal } from '../../hooks/useDeleteNoteModal';
import { useEditNoteModal } from '../../hooks/useEditNoteModal';
import { useNotes } from '../../hooks/useNotes';
import DeleteNoteModal from '../DeleteNoteModal';
import NoteModal from '../NoteModal';
import NotesList, { NotesListProps } from '../NotesList';
import SearchBar from '../SearchBar';
import { NEW_NOTE_BUTTON_TEXT } from './constants';
import { MainPageProps } from './types';

const MainPage: FC<MainPageProps> = ({
  //
}) => {
  const {
    notes,
    loadingNotes,
    searchValue,
    handleSearchChange,
    handleClickSearch,
    handleExpandNote,
    reloadNotes,
  } = useNotes();

  const {
    editModalTitle,
    editModalBody,
    editModalOpen,
    editModalLoading,
    editModalSuccess,
    editModalError,
    isEdit,
    charCountError,
    handleChangeTitle,
    handleChangeBody,
    handleOpenNewNote,
    handleOpenEditNote,
    handleCloseEditModal,
    handleSubmit,
  } = useEditNoteModal(reloadNotes);

  const {
    deleteModalOpen,
    deleteModalLoading,
    deleteModalSuccess,
    deleteModalError,
    deleteNoteId,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDelete,
  } = useDeleteNoteModal(reloadNotes);

  const flattenedNotes: NotesListProps['notes'] = Object
    .keys(notes)
    .map((noteId) => ( notes[parseInt(noteId)] ));

  return(<div>
    <DeleteNoteModal
      open={deleteModalOpen}
      noteTitle={deleteNoteId ? notes[deleteNoteId]?.title || '' : ''}
      error={deleteModalError}
      deleteSuccess={deleteModalSuccess}
      loading={deleteModalLoading}
      onDelete={handleDelete}
      onClose={handleCloseDeleteModal}
    />
    <NoteModal
      open={editModalOpen}
      isEdit={isEdit}
      noteTitle={editModalTitle}
      noteBody={editModalBody}
      error={editModalError}
      submitSuccess={editModalSuccess}
      loading={editModalLoading}
      noteBodyError={charCountError}
      onChangeTitle={handleChangeTitle}
      onChangeBody={handleChangeBody}
      onClose={handleCloseEditModal}
      onSubmit={handleSubmit}
    />
    <SearchBar
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      onClickSearch={handleClickSearch}
    />
    <Button
      onClick={handleOpenNewNote}
    >
      {NEW_NOTE_BUTTON_TEXT}
    </Button>
    <NotesList
      notes={flattenedNotes}
      loading={loadingNotes}
      onExpandNote={handleExpandNote}
      onEditNote={handleOpenEditNote}
      onDeleteNote={handleOpenDeleteModal}
    />
  </div>);
}

export default MainPage;
