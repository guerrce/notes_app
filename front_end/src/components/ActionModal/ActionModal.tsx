import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import React, { FC } from "react";
import { CLOSE_BUTTON_TEXT, DEFAULT_CANCEL_BUTTON_TEXT, DEFAULT_ERROR_MESSAGE, DEFAULT_SUBMIT_BUTTON_TEXT, DEFAULT_SUCCESS_MESSAGE } from "./constants";
import { ErrorMessageContainer } from "./styled";
import { ActionModalProps } from "./types";

const ActionModal: FC<ActionModalProps> = ({
  dialogTitle,
  open,
  error,
  errorMessage=DEFAULT_ERROR_MESSAGE,
  actionSuccess,
  actionSuccessMessage=DEFAULT_SUCCESS_MESSAGE,
  loading,
  actionSubmitButtonText=DEFAULT_SUBMIT_BUTTON_TEXT,
  cancelButtonText=DEFAULT_CANCEL_BUTTON_TEXT,
  onActionSubmit,
  onClose,
  children,
}) => {

  const getModalContent = () => {
    if (error){
      return (
        <ErrorMessageContainer>
          <Typography>
            {errorMessage}
          </Typography>
        </ErrorMessageContainer>
      );
    } else if (loading) {
      return (
        <CircularProgress />
      );
    } else if (actionSuccess) {
      return (
        <Typography>
          {actionSuccessMessage}
        </Typography>
      );
    } else {
      return children;
    }
  };

  const normalState = !(error || loading || actionSuccess);

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        {getModalContent()}
      </DialogContent>
      <DialogActions>
        {normalState && (
          <Button onClick={onActionSubmit}>
            {actionSubmitButtonText}
          </Button>
        )}
        <Button onClick={onClose}>
          {normalState ? cancelButtonText : CLOSE_BUTTON_TEXT}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionModal;
