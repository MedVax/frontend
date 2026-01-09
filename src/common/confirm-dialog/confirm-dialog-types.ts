import {
  type DialogProps as MUIDialogProps,
  type ButtonProps,
  type DialogTitleProps,
  type TextFieldProps,
  type DialogContentTextProps,
  type DialogActionsProps,
  type DialogContentProps,
  type LinearProgressProps,
} from "@mui/material";

export interface ConfirmDialogPropsType {
  show: boolean;
  finalOptions: FinalOptionsType;
  progress: number;
  onCancel: () => void;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export interface GlobalOptionsType {
  confirmButtonText?: string;
  cancelButtonText?: string;
  rejectOnCancel?: boolean;
  dialogProps?: Omit<MUIDialogProps, "open" | "onClose">;
  dialogTitleProps?: DialogTitleProps;
  dialogContentProps?: DialogContentProps;
  dialogContentTextProps?: DialogContentTextProps;
  dialogActionsProps?: DialogActionsProps;
  confirmTextFieldProps?: Omit<TextFieldProps, "onChange" | "value">;
  timerProgressProps?: Partial<LinearProgressProps>;
  confirmButtonProps?: Omit<ButtonProps, "onClick" | "disabled">;
  cancelButtonProps?: Omit<ButtonProps, "onClick">;
}

export interface ConfirmOptionsType extends GlobalOptionsType {
  title?: string | React.ReactNode;
  description?: React.ReactNode;
  confirmText?: string;
  timer?: number;
  onConfirm?: () => Promise<void> | void;
}

export declare type FinalOptionsType = Partial<
  GlobalOptionsType & ConfirmOptionsType
>;

export declare type HandleConfirm = (options?: ConfirmOptionsType) => void;
