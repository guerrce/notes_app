import React, { FC } from 'react';
import { CircularProgress, List, ListItem } from '@mui/material';
import { NoteProps, NotesListProps } from './types';
import Note from '../Note/Note';

const NotesList: FC<NotesListProps> = ({
  notes,
  loading,
  onExpandNote,
  onEditNote,
  onDeleteNote,
}) => {
  const makeNoteListItem = (note: NoteProps, key: number) => {
    const {title, body, expanded, id: noteId} = note;
    return (
      <ListItem key={key}>
        <Note
          title={title}
          body={body}
          expanded={expanded}
          onExpand={() => {onExpandNote(noteId)}}
          onEdit={() => {onEditNote(noteId, title, body)}}
          onDelete={() => {onDeleteNote(noteId)}}
        />
      </ListItem>
    )
  };

  if (loading) {
    return (
      <CircularProgress />
    )
  }
  
  return(
    <List>
      {notes.map((noteProps, index) => (
        makeNoteListItem(noteProps, index)
      ))}
    </List>
  );
}

export default NotesList;
