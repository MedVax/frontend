import { Icon, InlineIcon } from "@iconify/react/dist/iconify.js";
import {
  Dialog,
  DialogContent,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import FilePreviewCard from "./FilePreviewCard";
import useToggle from "hooks/use-toggle";
import { getFileName, getFileType } from "utils/file";
import clsx from "clsx";

type FileCardProps = {
  file: File | string;
  className?: string;
  cancel?: () => void;
};
export default function FileCard(props: FileCardProps) {
  const { file, cancel, className } = props;
  const [isPreview, togglePreview] = useToggle();

  const url =
    file instanceof File
      ? Object?.assign(file, {
          preview: URL?.createObjectURL(file),
        })?.preview
      : file;

  const type = file instanceof File ? file?.type : getFileType(url);
  const fileName = file instanceof File ? file?.name : getFileName(url);

  return (
    <Paper
      elevation={0}
      className={clsx(className && className, "bg-gray-100 p-2 relative")}
    >
      {cancel && (
        <IconButton
          variant="filled"
          size="small"
          className="absolute -top-2 right-0"
          onClick={cancel}
        >
          <Icon icon="iconoir:cancel" />
        </IconButton>
      )}
      <div className="flex items-center justify-between gap-2">
        <Typography noWrap>{fileName}</Typography>
        <div className="flex">
          <Tooltip title="Download">
            <IconButton component="a" href={url} download>
              <InlineIcon icon="solar:download-bold-duotone" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Preview" onClick={togglePreview}>
            <IconButton>
              <Icon icon="ic:twotone-visibility" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {isPreview && (
        <Dialog
          fullWidth
          maxWidth="sm"
          open={isPreview}
          onClose={togglePreview}
        >
          <DialogContent>
            <FilePreviewCard title={fileName} url={url} type={type} />
          </DialogContent>
        </Dialog>
      )}
    </Paper>
  );
}
