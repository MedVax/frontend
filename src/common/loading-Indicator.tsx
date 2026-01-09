import { CircularProgress, CircularProgressProps } from "@mui/material";
import { forwardRef } from "react";
import clsx from "clsx";

const LoadingIndicator = forwardRef(
  /**
   *
   * @param {import("@mui/material").CircularProgressProps} props
   */
  function LoadingIndicator(props: CircularProgressProps, ref: any) {
    return (
      <div
        ref={ref}
        {...props}
        className={clsx(
          "bg-white rounded-full flex items-center justify-center p-1;",
          props.className
        )}
      >
        <CircularProgress thickness={1} size={60} />
      </div>
    );
  }
);

export default LoadingIndicator;
