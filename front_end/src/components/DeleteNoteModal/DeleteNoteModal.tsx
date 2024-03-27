import React, { FC } from "react";
import { Button, Typography } from "@mui/material";
import { CANCEL_BUTTON_TEXT, DELETE_BUTTON_TEXT, DELETE_NOTE_ERROR_MESSAGE, DELETE_NOTE_SUCCESS_MESSAGE } from "./constants";
import { DeleteNoteModalProps } from "./types";
import ActionModal from "../ActionModal";

const DeleteNoteModal: FC<DeleteNoteModalProps> = ({
  open,
  noteTitle,
  error,
  deleteSuccess,
  loading,
  onDelete,
  onClose,
}) => {
  const deleteNoteMessage =  `Are you sure you want to delete note ${noteTitle}?`;

  return (
    <ActionModal
      open={open}
      error={error}
      errorMessage={DELETE_NOTE_ERROR_MESSAGE}
      actionSuccess={deleteSuccess}
      actionSuccessMessage={DELETE_NOTE_SUCCESS_MESSAGE}
      loading={loading}
      onClose={onClose}
    >
      <div>
        <Typography>
          {deleteNoteMessage}
        </Typography>
        <span>
          <Button onClick={onDelete}>
            {DELETE_BUTTON_TEXT}
          </Button>
          <Button onClick={onClose}>
            {CANCEL_BUTTON_TEXT}
          </Button>
        </span>
      </div>
    </ActionModal>
  );
};

export default DeleteNoteModal;
