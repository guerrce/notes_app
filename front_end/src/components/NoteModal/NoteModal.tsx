import { Button, FormControl, FormHelperText, OutlinedInput, TextField } from "@mui/material";
import React, { FC } from "react";
import { MAX_NOTE_BODY_LENGTH, MIN_NOTE_BODY_LENGTH } from "../../constants";
import ActionModal from "../ActionModal";
import { CANCEL_BUTTON_TEXT, EDIT_NOTE_ERROR_MESSAGE, EDIT_NOTE_SUCCESS_MESSAGE, NEW_NOTE_ERROR_MESSAGE, NEW_NOTE_SUCCESS_MESSAGE, NOTE_BODY_LABEL, NOTE_TITLE_LABEL, SUBMIT_BUTTON_TEXT } from "./constants";
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

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeTitle(event.target.value);
  }

  const handleChangeBody = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeBody(event.target.value);
  }

  return (
    <ActionModal
      open={open}
      error={error}
      errorMessage={errorMessage}
      actionSuccess={submitSuccess}
      actionSuccessMessage={successMessage}
      loading={loading}
      onClose={onClose}
    >
      <div>
        <TextField
          label={NOTE_TITLE_LABEL}
          value={noteTitle}
          onChange={handleChangeTitle}
        />
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
        <span>
          <Button onClick={onSubmit}>
            {SUBMIT_BUTTON_TEXT}
          </Button>
          <Button onClick={onClose}>
            {CANCEL_BUTTON_TEXT}
          </Button>
        </span>
      </div>
    </ActionModal>);
};

export default NoteModal;
