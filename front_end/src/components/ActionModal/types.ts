import { ReactElement } from "react";

export interface ActionModalProps extends React.PropsWithChildren {
  open: boolean;
  error?: boolean;
  errorMessage?: string;
  actionSuccess?: boolean;
  actionSuccessMessage?: string;
  loading?: boolean;
  onClose: () => void;
  children: ReactElement;
};
