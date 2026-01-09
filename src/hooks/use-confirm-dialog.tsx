import ConfirmContext from "common/confirm-dialog/confirm-dialog-context";
import { HandleConfirm } from "common/confirm-dialog/confirm-dialog-types";
import React from "react";

export const useConfirmDialog = (): HandleConfirm => {
  const confirm = React.useContext(ConfirmContext);

  if (!confirm) {
    throw new Error(
      "useConfirmDialog must be used within a ConfirmDialogProvider"
    );
  }

  return confirm;
};
