import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Button,
  DialogProps,
  Typography,
} from "@mui/material";

export function ErrorDialog(props: ErrorDialogProps) {
  const {
    title = "Something went wrong",
    description = "Sorry, something went wrong, Please try again later.",
    retryText = "Try Again",
    onRetry,
    ...restProps
  } = props;

  function handleRetry(e) {
    e.stopPropagation();
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  }

  return (
    <Dialog fullWidth {...restProps}>
      <DialogContent className="flex flex-col items-center gap-4">
        <Icon icon="mage:robot-sad" fontSize={72} className="text-error-main" />
        <div className="mb-4">
          <Typography variant="h5" className="font-bold text-center mb-2">
            {title}
          </Typography>
          <DialogContentText className="text-center">
            {description}
          </DialogContentText>
        </div>
        <Button size="large" onClick={handleRetry}>
          {retryText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorDialog;

export type ErrorDialogProps = {
  title?: string;
  description?: string;
  onRetry?: (e?: Event) => void;
  retryText?: string;
} & DialogProps;
