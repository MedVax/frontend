import React from "react";
import { InputAdornment, IconButton } from "@mui/material";
import clsx from "clsx";
import TextField from "./text-field";
import { Icon } from "@iconify/react/dist/iconify.js";

/** @param {import("@mui/material").TextFieldProps} props */
function PasswordTextField(props) {
  const { error, InputProps, ...rest } = props;
  const [isVisible, setVisible] = React.useState(false);
  const handleVisible = React.useCallback(() => setVisible((p) => !p), []);

  return (
    <TextField
      type={isVisible ? "text" : "password"}
      InputProps={{
        ...InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleVisible}
              disabled={props.disabled}
            >
              <Icon
                fontSize={25}
                icon={
                  isVisible
                    ? "material-symbols-light:visibility-lock-sharp"
                    : "material-symbols-light:visibility"
                }
                className={clsx(error ? "text-danger" : "text-primary")}
              />
            </IconButton>
          </InputAdornment>
        ),
      }}
      error={error}
      {...rest}
    />
  );
}

export default PasswordTextField;
