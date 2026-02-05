import { Icon } from "@iconify/react/dist/iconify.js";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

const SearchTextField = forwardRef(
  /**
   *
   * @param {import("@mui/material").TextFieldProps} props
   * @param {any} ref
   */
  function SearchTextField(props: TextFieldProps, ref: React.Ref<HTMLInputElement>) {
    const { InputProps, ...rest } = props;

    return (
      <TextField
        ref={ref}
        placeholder="Search"
        InputProps={{
          ...InputProps,
          ...(!InputProps?.startAdornment && {
            startAdornment: (
              <InputAdornment position="start">
                <Icon fontSize={20} icon="icon-park-outline:search" />{" "}
              </InputAdornment>
            ),
          }),
        }}
        {...rest}
      />
    );
  }
);

export default SearchTextField;
