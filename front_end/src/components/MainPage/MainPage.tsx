import { Button } from '@mui/material';
import React, { FC, useState } from 'react';
import { MAX_NOTE_BODY_LENGTH, MIN_NOTE_BODY_LENGTH, NOTE_SUCCESS_MESSAGE_TIME } from '../../constants';
import DeleteNoteModal from '../DeleteNoteModal';
import NoteModal from '../NoteModal';
import NotesList, { NoteProps, NotesListProps } from '../NotesList';
import SearchBar from '../SearchBar';
import { NEW_NOTE_BUTTON_TEXT } from './constants';
import { MainPageProps } from './types';

const MainPage: FC<MainPageProps> = ({
  //
}) => {
  // notes stuff
  const [notes, setNotes] = useState<{[noteId: string]: NoteProps}>({});

  const handleExpandNote = (noteId: string) => {
    const note = notes[noteId];
    const previousNoteState = note.expanded;
    const newNote = {
      ...note,
      expanded: !previousNoteState
    };
    const newNotes = {
      ...notes,
      [noteId]: newNote,
    }
    setNotes(newNotes);
  };


  // modal stuff
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalNoteTitle, setModalNoteTitle] = useState<string>('');
  const [modalNoteBody, setModalNoteBody] = useState<string>('');
  const [noteId, setNoteId] = useState<string | undefined>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);
  const [charCountError, setCharCountError] = useState<boolean>(false);
  const isEdit = !!noteId;

  const handleOpenNewNote = () => {
    setModalOpen(true);
    setNoteId(undefined);
  };

  const handleOpenEditNote = (noteId: string) => {
    const {title, body} = notes[noteId];
    setNoteId(noteId);
    setModalNoteTitle(title);
    setModalNoteBody(body);
    setModalOpen(true);
  };
  const handleChangeTitle = (input: string) => {
    setModalNoteTitle(input);
  };
  const handleChangeBody = (input: string) => {
    setModalNoteBody(input);
  };
  const handleSubmit = () => {
    const bodyCharCount = modalNoteBody.length;
    if (MIN_NOTE_BODY_LENGTH < bodyCharCount && bodyCharCount < MAX_NOTE_BODY_LENGTH){
      console.log(`Submit. title: ${modalNoteTitle} body: ${modalNoteBody}`);
      setSubmitSuccess(true);
      setModalNoteTitle('');
      setModalNoteBody('');
      setCharCountError(false);
      setTimeout(() => {
        setModalOpen(false);
        setSubmitSuccess(false)
      }, NOTE_SUCCESS_MESSAGE_TIME);
    } else {
      setCharCountError(true);
    }
  };
  const handleCloseModoal = () => {
    setModalOpen(false);
    setModalNoteTitle('');
    setModalNoteBody('');
    setCharCountError(false);
    setSubmitSuccess(false);
  };

  // Delete modal stuff
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteModalLoading, setDeleteModalLoading] = useState<boolean>(false);
  const [deleteModalError, setDeleteModalError] = useState<boolean>(false);
  const [deleteModalSuccess, setDeleteModalSuccess] = useState<boolean>(false);
  const [deleteNoteId, setDeleteNoteId] = useState<string>('');
  
  const handleOpenDeleteModal = (noteId: string) => {
    setDeleteNoteId(noteId);
    setDeleteModalOpen(true);
  };

  const handleDelete = () => {
    console.log( `Deleted note: ${deleteNoteId}`);
    setDeleteModalSuccess(true);
    setTimeout(() => {
      setDeleteModalOpen(false);
      setDeleteModalSuccess(false)
    }, NOTE_SUCCESS_MESSAGE_TIME);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteNoteId('');
  };

  // search stuff

  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = (newSearchValue: string) => {
    setSearchValue(newSearchValue)
  };

  const handleClickSearch = () => {};

  // other stuff

  const flattenedNotes: NotesListProps['notes'] = Object
    .keys(notes)
    .map((noteId) => ( notes[noteId] ));

  return(<div>
    <DeleteNoteModal
      open={deleteModalOpen}
      noteTitle={notes[deleteNoteId]?.title || ''}
      error={deleteModalError}
      deleteSuccess={deleteModalSuccess}
      loading={deleteModalLoading}
      onDelete={handleDelete}
      onClose={handleCloseDeleteModal}
    />
    <NoteModal
      open={modalOpen}
      isEdit={isEdit}
      noteTitle={modalNoteTitle}
      noteBody={modalNoteBody}
      error={submitError}
      submitSuccess={submitSuccess}
      loading={submitLoading}
      onChangeTitle={handleChangeTitle}
      onChangeBody={handleChangeBody}
      onClose={handleCloseModoal}
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
      onExpandNote={handleExpandNote}
      onEditNote={handleOpenEditNote}
      onDeleteNote={handleOpenDeleteModal}
    />
  </div>);
}

export default MainPage;
