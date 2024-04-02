import { useState } from "react";
import { NOTE_SUCCESS_MESSAGE_TIME } from "../constants";

export const useGenericModal = ({
  onSubmit
}: {
  onSubmit: () => Promise<string | undefined>;
}): {
  open: boolean,
  loading: boolean,
  success: boolean,
  error: boolean,
  openModal: () => void,
  closeModal: () => void,
  submit: () => void;
} => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [modalSuccess, setModalSuccess] = useState<boolean>(false);
  const [modalError, setModalError] = useState<boolean>(false);
  const [timeout, setTimeoutVal] = useState<NodeJS.Timeout | undefined>();

  const openModal = () => {
    setModalSuccess(false);
    setModalOpen(true);
  };

  const submit = async () => {
    setModalLoading(true);
    const submitStatus = await onSubmit();
    if (submitStatus === 'success'){
      setModalLoading(false);
      setModalSuccess(true);
      const newTimeout = setTimeout(() => {
        setModalOpen(false);
      }, NOTE_SUCCESS_MESSAGE_TIME);
      setTimeoutVal(newTimeout)
    }
    if (submitStatus === 'error'){
      setModalLoading(false);
      setModalError(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    clearTimeout(timeout);
  };

  return {
    open: modalOpen,
    loading: modalLoading,
    success: modalSuccess,
    error: modalError,
    openModal,
    closeModal,
    submit
  };
};
