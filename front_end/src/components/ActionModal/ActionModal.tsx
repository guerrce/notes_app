import { Button, CircularProgress, Modal, Typography } from "@mui/material";
import React, { FC } from "react";
import { DEFAULT_ERROR_MESSAGE, DEFAULT_SUCCESS_MESSAGE } from "./constants";
import { ErrorMessageContainer } from "./styled";
import { ActionModalProps } from "./types";

const ActionModal: FC<ActionModalProps> = ({
  open,
  error,
  errorMessage=DEFAULT_ERROR_MESSAGE,
  actionSuccess,
  actionSuccessMessage=DEFAULT_SUCCESS_MESSAGE,
  loading,
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

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      {getModalContent()}
    </Modal>
  );
};

export default ActionModal;
