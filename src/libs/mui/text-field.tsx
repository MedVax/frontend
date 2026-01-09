import {
  TextField as MuiTextField,
  TextFieldProps,
  styled,
} from "@mui/material";
import { forwardRef, useState } from "react";

export const TextField = styled(
  forwardRef(
    /**
     *
     * @param {import("@mui/material").TextFieldProps} props
     * @param {*} ref
     * @returns
     */
    function TextField(props: TextFieldProps, ref: any) {
      const { InputLabelProps, InputProps, onFocus, onBlur, ...restProps } =
        props;
      const [shrink, setShrink] = useState(
        !!restProps.value || !!restProps.defaultValue
      );
      const hasStartAdornment = InputProps?.startAdornment;

      if (!!restProps.value && !shrink) {
        setShrink(true);
      }

      return (
        <MuiTextField
          ref={ref}
          onFocus={(e) => {
            setShrink(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            onBlur?.(e);
            setShrink(!!e.target.value);
          }}
          InputLabelProps={{
            ...(hasStartAdornment ? { shrink } : {}),
            ...InputLabelProps,
          }}
          InputProps={{ ...InputProps }}
          {...restProps}
        />
      );
    }
  )
)(({ InputProps }) =>
  InputProps?.startAdornment
    ? {
        "& .MuiInputBase-inputAdornedStart": {
          paddingLeft: "10px !important",
        },
        "& .MuiFormLabel-root": {
          "&.MuiInputLabel-filled": {
            "&:not(.MuiInputLabel-shrink)": {
              paddingLeft: "35px !important",
            },
          },
        },
        "& .MuiInputLabel-root": {
          "&.MuiInputLabel-filled": {
            "&.MuiInputLabel-shrink": {
              paddingLeft: "43px !important",
            },
          },
        },
        "& .MuiInputAdornment-root": {
          "&:not(.MuiInputAdornment-hiddenLabel)": {
            "&.MuiInputAdornment-positionStart": { margin: "0 !important" },
          },
        },
      }
    : {}
);

export default TextField;
