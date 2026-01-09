import { Icon } from "@iconify/react/dist/iconify.js";
import { DialogTitle, IconButton, DialogTitleProps } from "@mui/material";
import clsx from "clsx";

function DialogTitleXCloseButton(props: DialogTitleXCloseButtonProps) {
  const { children, onClose, className, ...other } = props;

  return (
    <DialogTitle
      className={clsx("font-tropiline relative", className)}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          className="absolute top-2"
          sx={{ right: "30px" }}
          aria-label="close"
          variant="filled"
          color="primary"
          onClick={onClose}
        >
          <Icon icon="material-symbols:close" />{" "}
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default DialogTitleXCloseButton;

export type DialogTitleXCloseButtonProps = {
  onClose?: (e: any) => void;
} & DialogTitleProps;
