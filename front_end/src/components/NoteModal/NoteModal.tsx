import { FormControl, FormHelperText, OutlinedInput, TextField } from "@mui/material";
import React, { FC } from "react";
import { MAX_NOTE_BODY_LENGTH, MIN_NOTE_BODY_LENGTH } from "../../constants";
import ActionModal from "../ActionModal";
import { EDIT_NOTE_DIALOG_TITLE, EDIT_NOTE_ERROR_MESSAGE, EDIT_NOTE_SUCCESS_MESSAGE, NEW_NOTE_DIALOG_TITLE, NEW_NOTE_ERROR_MESSAGE, NEW_NOTE_SUCCESS_MESSAGE, NOTE_BODY_LABEL, NOTE_TITLE_LABEL } from "./constants";
import { NoteModalProps } from "./types";

const NoteModal: FC<NoteModalProps> = ({
  open,
  isEdit,
  noteTitle,
  noteBody,
  noteBodyError,
  error,
  submitSuccess,
  loading,
  onChangeTitle,
  onChangeBody,
  onClose,
  onSubmit,
}) => {
  const successMessage = isEdit ? EDIT_NOTE_SUCCESS_MESSAGE : NEW_NOTE_SUCCESS_MESSAGE;
  const errorMessage = isEdit ? EDIT_NOTE_ERROR_MESSAGE : NEW_NOTE_ERROR_MESSAGE;
  const charCountHelperText = `${noteBody?.length || 0}/${MAX_NOTE_BODY_LENGTH}, min: ${MIN_NOTE_BODY_LENGTH}`;
  const dialogTitle = isEdit ? EDIT_NOTE_DIALOG_TITLE : NEW_NOTE_DIALOG_TITLE

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTitle(event.target.value);
  }

  const handleChangeBody = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeBody(event.target.value);
  }

  return (
    <ActionModal
      dialogTitle={dialogTitle}
      open={open}
      error={error}
      errorMessage={errorMessage}
      actionSuccess={submitSuccess}
      actionSuccessMessage={successMessage}
      loading={loading}
      onClose={onClose}
      onActionSubmit={onSubmit}
    >
      <div>
        <div>
          <TextField
            label={NOTE_TITLE_LABEL}
            value={noteTitle}
            onChange={handleChangeTitle}
          />
        </div>
        <div>
          <FormControl>
            <OutlinedInput
              label={NOTE_BODY_LABEL}
              value={noteBody}
              onChange={handleChangeBody}
              multiline
              rows={4}
              error={noteBodyError}
            />
            <FormHelperText>{charCountHelperText}</FormHelperText>
          </FormControl>
        </div>
      </div>
    </ActionModal>);
};

export default NoteModal;
