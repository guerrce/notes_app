import React, { FC } from "react";
import { Typography } from "@mui/material";
import { DELETE_BUTTON_TEXT, DELETE_NOTE_DIALOG_TITLE, DELETE_NOTE_ERROR_MESSAGE, DELETE_NOTE_SUCCESS_MESSAGE } from "./constants";
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
      dialogTitle={DELETE_NOTE_DIALOG_TITLE}
      open={open}
      error={error}
      errorMessage={DELETE_NOTE_ERROR_MESSAGE}
      actionSuccess={deleteSuccess}
      actionSuccessMessage={DELETE_NOTE_SUCCESS_MESSAGE}
      loading={loading}
      onClose={onClose}
      onActionSubmit={onDelete}
      actionSubmitButtonText={DELETE_BUTTON_TEXT}
    >
      <div>
        <Typography>
          {deleteNoteMessage}
        </Typography>
      </div>
    </ActionModal>
  );
};

export default DeleteNoteModal;
