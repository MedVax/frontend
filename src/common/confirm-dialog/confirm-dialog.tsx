import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  LinearProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { defaultGlobalConfirmDialogOptions } from "constants/global";
import React from "react";

import { type ConfirmDialogPropsType } from "./confirm-dialog-types";
import { Icon } from "@iconify/react/dist/iconify.js";

const initialConfirmInputState = {
  value: "",
  isMatched: false,
};

/**
 *
 * @param {ConfirmDialogProps} props
 * @returns
 */
function ConfirmDialog(props: ConfirmDialogPropsType) {
  const { show, progress, onClose, onCancel, onConfirm, finalOptions } = props;
  const [confirmInput, setConfirmInput] = React.useState(
    initialConfirmInputState
  );
  const [loading, setLoading] = React.useState(false);

  const isConfirmDisabled = Boolean(
    !confirmInput.isMatched && finalOptions?.confirmText
  );

  const handleConfirm = React.useCallback(async () => {
    try {
      if (isConfirmDisabled) return;
      setLoading(true);
      await onConfirm();
      setConfirmInput(initialConfirmInputState);
      // @es-ignore
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }, [isConfirmDisabled, onConfirm]);

  const handleCancelOnClose = React.useCallback((handler: () => void) => {
    handler();
    setConfirmInput(initialConfirmInputState);
  }, []);

  const handleConfirmInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputValue = event.currentTarget.value;

    setConfirmInput({
      value: inputValue,
      isMatched: finalOptions?.confirmText === inputValue,
    });
  };

  return (
    <Dialog
      {...finalOptions.dialogProps}
      open={show}
      PaperProps={{
        style: {
          padding: "24px 24px 24px 16px",
          borderRadius: "16px",
        },
      }}
      onClose={() => {
        handleCancelOnClose(onClose);
      }}
    >
      {progress > 0 && (
        <LinearProgress
          variant="determinate"
          value={progress}
          {...finalOptions.timerProgressProps}
        />
      )}

      <DialogTitle
        {...finalOptions.dialogTitleProps}
        variant="body2"
        className="p-0 inline-flex justify-between items-center font-semibold select-none"
      >
        <span>{finalOptions.title} </span>{" "}
        {onClose ? (
          <IconButton
            aria-label="close"
            variant="filled"
            color="primary"
            onClick={onClose}
          >
            <Icon icon="material-symbols:close" />{" "}
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent
        sx={{
          padding: "10px 0",
        }}
        {...finalOptions?.dialogContentProps}
      >
        {finalOptions?.description && (
          <Typography color="#6C6C6C" {...finalOptions.dialogContentTextProps}>
            {finalOptions?.description}
          </Typography>
        )}
        {finalOptions?.confirmText && (
          <TextField
            autoFocus
            fullWidth
            {...finalOptions.confirmTextFieldProps}
            onChange={handleConfirmInput}
            value={confirmInput.value}
          />
        )}
      </DialogContent>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <Button
          fullWidth
          onClick={() => {
            handleCancelOnClose(onCancel);
          }}
          {...finalOptions.cancelButtonProps}
        >
          {finalOptions?.cancelButtonText ||
            defaultGlobalConfirmDialogOptions.cancelButtonText}
        </Button>
        <Button
          {...finalOptions.confirmButtonProps}
          onClick={handleConfirm}
          fullWidth
          disabled={isConfirmDisabled || loading}
        >
          {finalOptions?.confirmButtonText ||
            defaultGlobalConfirmDialogOptions.confirmButtonText}
        </Button>
      </div>
    </Dialog>
  );
}

export default ConfirmDialog;

/**
 * @typedef {{
 *   confirmButtonText?: string;
 * cancelButtonText?: string;
 * rejectOnCancel?: boolean;
 * dialogProps?: Omit<import('@mui/material').DialogProps , "open" | "onClose">;
 * dialogTitleProps?: import('@mui/material').DialogTitleProps;
 * dialogContentProps?: import('@mui/material').DialogContentProps;
 * dialogContentTextProps?: import('@mui/material').DialogContentTextProps;
 * dialogActionsProps?: import('@mui/material').DialogActionsProps;
 * confirmTextFieldProps?: Omit<import('@mui/material').TextFieldProps, "onChange" | "value">;
 * timerProgressProps?: Partial<import('@mui/material').LinearProgressProps>;
 * confirmButtonProps?: Omit<import('@mui/material').ButtonProps, "onClick" | "disabled">;
 * cancelButtonProps?: Omit<import('@mui/material').ButtonProps, "onClick">;
 * }} GlobalOptions
 */

/**
 * @typedef { GlobalOptions & {
 *  title: string;
 * description?: React.ReactNode;
 * confirmText?: string;
 * timer?: number;
 * onConfirm?: () => Promise<void> | void;
 * }} ConfirmOptions
 */

/** @type {GlobalOptions & ConfirmOptions} FinalOptions */

/**
 * @typedef {{
 *  show: boolean;
 * finalOptions: FinalOptions;
 * progress: number;
 * onCancel: () => void;
 * onClose: () => void;
 * onConfirm: () => Promise<void>;
 * }} ConfirmDialogProps
 */
