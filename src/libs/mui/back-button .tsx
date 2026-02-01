"use client";
import { IconButton, type IconButtonProps, Tooltip } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

/**
 *
 * @param {import("@mui/material").ButtonProps} props
 */
function BackButton(props: IconButtonProps) {
  const router = useRouter();
  return (
    <Tooltip title="Go Back">
      <IconButton
        onClick={() => {
          router.back();
        }}
        {...props}
      >
        <Icon icon="grommet-icons:form-previous" />{" "}
      </IconButton>
    </Tooltip>
  );
}

BackButton.defaultProps = {};

export default BackButton;
