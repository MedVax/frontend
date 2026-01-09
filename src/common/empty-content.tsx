import { Typography } from "@mui/material";
import clsx from "clsx";
import "./empty-content.css";
import { Icon } from "@iconify/react/dist/iconify.js";

export function EmptyContent(props) {
  const { title, className, ...rest } = props;
  return (
    <div className={clsx("EmptyContent", className)} {...rest}>
      <Icon
        className={clsx("EmptyContent__icon")}
        icon="solar:file-corrupted-broken"
        fontSize={50}
      />
      <Typography variant="h6" className={clsx("EmptyContent__text")}>
        {title ? title : "No data"}
      </Typography>
    </div>
  );
}

export default EmptyContent;
