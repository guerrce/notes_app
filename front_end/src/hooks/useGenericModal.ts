import { useState } from "react";
import { NOTE_SUCCESS_MESSAGE_TIME } from "../constants";

export const useGenericModal = ({
  onSubmit,
  reload,
}: {
  onSubmit: () => Promise<string | undefined>;
  reload?: () => void;
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
    setModalLoading(false);
    setModalSuccess(false);
    setModalError(false);
    setModalOpen(true);
  };

  const closeModalWrapper = () => {
    setModalOpen(false);
    reload && reload();
  }

  const submit = async () => {
    setModalLoading(true);
    const submitStatus = await onSubmit();
    if (submitStatus === 'success'){
      setModalSuccess(true);
      const newTimeout = setTimeout(() => {
        closeModalWrapper();
      }, NOTE_SUCCESS_MESSAGE_TIME);
      setTimeoutVal(newTimeout)
    }
    if (submitStatus === 'error'){
      setModalError(true);
    }
    setModalLoading(false);
  };

  const closeModal = () => {
    closeModalWrapper();
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
