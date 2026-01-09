import { Button, Typography } from "@mui/material";
import clsx from "clsx";
import "./error-content.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import useLogout from "hooks/use-logout";

/**
 *
 * @param {ErrorContentProps} props
 */
function ErrorContent(props) {
  const { title, description, className, onRetry, ...rest } = props;
  const { logout } = useLogout();
  return (
    <div className={clsx("ErrorContent", className)} {...rest}>
      <Typography variant="h6" className="font-bold text-center">
        {title}
      </Typography>
      <div>
        <Icon
          className={clsx("ErrorContent__icon")}
          icon="fluent-emoji-high-contrast:sad-but-relieved-face"
        />
      </div>
      <Typography variant="body2" className="text-center mb-4 font-bold">
        {description}
      </Typography>
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outlined" onClick={logout}>
          Send Report
        </Button>
        <Button onClick={onRetry}>Try Again</Button>
      </div>
    </div>
  );
}

ErrorContent.defaultProps = {
  title: "Something went wrong",
  description: "We're quite sorry about this!",
  elevation: 0,
};

export default ErrorContent;

/**
 * @typedef {{
 * onRetry: Function
 * } & import("@mui/material").PaperProps} ErrorContentProps
 */
