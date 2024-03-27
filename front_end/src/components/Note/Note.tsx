import React, { FC } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button
} from '@mui/material';
import { NoteProps } from './types';

const Note: FC<NoteProps> = ({
  title,
  body,
  expanded,
  onExpand,
  onEdit,
  onDelete,
}) => {
  return(
    <Accordion onChange={onExpand} expanded={expanded}>
      <AccordionSummary>
        {title}
      </AccordionSummary>
      <AccordionDetails>
        {body}
      </AccordionDetails>
      <AccordionActions>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </AccordionActions>
    </Accordion>
  );
}

export default Note;
