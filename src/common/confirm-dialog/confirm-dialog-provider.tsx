import { defaultGlobalConfirmDialogOptions } from "constants/global";
import { useTimer } from "hooks/use-timer";
import React from "react";
import ConfirmDialog from "./confirm-dialog";
import ConfirmContext from "./confirm-dialog-context";
import {
  type ConfirmOptionsType,
  type FinalOptionsType,
  type GlobalOptionsType,
} from "./confirm-dialog-types";

/**
 *
 * @param {GlobalOptions} globalOptions
 * @param {ConfirmOptions} confirmOptions
 * @returns FinalOptions
 */
export const handleOverrideOptions = (
  globalOptions: any,
  confirmOptions: ConfirmOptionsType
): any => ({
  ...defaultGlobalConfirmDialogOptions,
  ...globalOptions,
  ...confirmOptions,
});

function ConfirmDialogProvider({
  children,
  ...globalOptions
}: {
  children?: React.ReactNode;
  globalOptions?: GlobalOptionsType;
}) {
  const [promise, setPromise] = React.useState<any>({});

  const [finalOptions, setFinalOptions] = React.useState<FinalOptionsType>({});
  const [timerProgress, setTimerProgress] = React.useState(0);
  const [timerIsRunning, setTimerIsRunning] = React.useState(false);

  const timer = useTimer({
    onTimeEnd: () => {
      handleCancel();
    },
    onTimeTick: (timeLeft: number) => {
      setTimerProgress(100 * timeLeft);
    },
  });

  const confirm = React.useCallback(
    async (confirmOptions: ConfirmOptionsType) => {
      return new Promise((resolve, reject) => {
        const finalOptions = handleOverrideOptions(
          globalOptions,
          confirmOptions
        );
        setFinalOptions(finalOptions);
        setPromise({ resolve, reject });

        if (finalOptions?.timer) {
          setTimerIsRunning(true);
          timer.start(finalOptions.timer);
        }
      });
      // eslint-disable-next-line
    },
    []
  );

  const handleStopTimer = React.useCallback(() => {
    if (timerIsRunning) {
      setTimerIsRunning(false);
      setTimerProgress(0);
      timer.stop();
    }
    // eslint-disable-next-line
  }, [timerIsRunning]);

  const handleResolveAndClear = React.useCallback(() => {
    promise?.resolve?.();
    setPromise({});
  }, [promise]);

  const handleRejectAndClear = React.useCallback(
    (disableClose?: any) => {
      promise?.reject?.();
      if (disableClose) return;
      setPromise({});
    },
    [promise]
  );

  const handleClose = React.useCallback(() => {
    handleStopTimer();
    handleResolveAndClear();
  }, [handleResolveAndClear, handleStopTimer]);

  const handleConfirm = React.useCallback(async () => {
    try {
      handleStopTimer();

      await finalOptions?.onConfirm?.();
      handleResolveAndClear();
    } catch (error) {
      handleRejectAndClear(Boolean(finalOptions?.confirmText));
      throw new Error(JSON.stringify(error));
    }
  }, [
    handleResolveAndClear,
    handleRejectAndClear,
    finalOptions,
    handleStopTimer,
  ]);

  const handleCancel = React.useCallback(() => {
    handleStopTimer();
    if (finalOptions?.rejectOnCancel) {
      handleRejectAndClear?.();
      return;
    }
    handleResolveAndClear();
  }, [
    handleResolveAndClear,
    handleRejectAndClear,
    finalOptions,
    handleStopTimer,
  ]);

  return (
    <>
      <ConfirmContext.Provider value={confirm}>
        {children}
      </ConfirmContext.Provider>
      <ConfirmDialog
        show={Object.keys(promise).length === 2}
        progress={timerProgress}
        onCancel={handleCancel}
        onClose={handleClose}
        onConfirm={handleConfirm}
        finalOptions={finalOptions}
      />
    </>
  );
}

export default ConfirmDialogProvider;

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
