import { ReactElement } from "react";

export interface ActionModalProps extends React.PropsWithChildren {
  dialogTitle: string;
  open: boolean;
  error?: boolean;
  errorMessage?: string;
  actionSuccess?: boolean;
  actionSuccessMessage?: string;
  loading?: boolean;
  onActionSubmit: () => void;
  onClose: () => void;
  actionSubmitButtonText?: string;
  cancelButtonText?: string;
  children: ReactElement;
};
