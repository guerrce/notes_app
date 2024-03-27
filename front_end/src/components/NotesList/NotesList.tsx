import React, { FC } from 'react';
import { List, ListItem } from '@mui/material';
import { NoteProps, NotesListProps } from './types';
import Note from '../Note/Note';

const NotesList: FC<NotesListProps> = ({
  notes,
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
          onEdit={() => {onEditNote(noteId)}}
          onDelete={() => {onDeleteNote(noteId)}}
        />
      </ListItem>
    )
  };
  
  return(
    <List>
      {notes.map((noteProps, index) => (
        makeNoteListItem(noteProps, index)
      ))}
    </List>
  );
}

export default NotesList;
