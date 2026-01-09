import { Icon } from "@iconify/react/dist/iconify.js";
import IconButton from "@mui/material/IconButton";
import { useSnackbar } from "notistack";

export function SnackbarCloseButton({
  snackbarKey,
}: {
  snackbarKey: string | number;
}) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton
      sx={{ color: "#FFFFFF" }}
      onClick={() => {
        closeSnackbar(snackbarKey);
      }}
    >
      <Icon icon="material-symbols:close" />{" "}
    </IconButton>
  );
}
