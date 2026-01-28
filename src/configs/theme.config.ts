import type {} from "@mui/material/themeCssVarsAugmentation";
import DateFormat from "enums/date-format";
import {
  createTheme,
  responsiveFontSizes,
  alpha,
  ComponentsVariants,
  PaletteOptions,
  Theme as MuiTheme,
} from "@mui/material/styles";
import {
  DatePickerProps,
  DesktopDatePickerProps,
  MobileDatePickerProps,
} from "@mui/x-date-pickers";
import { LoadingButtonProps } from "@mui/lab";
import { linearProgressClasses } from "@mui/material";
import palette from "@/theme/palette";

const commonPaletteOptions: PaletteOptions = {
  ...palette,
};

export const theme = responsiveFontSizes(
  createTheme({
    cssVariables: true,
    palette: {
      ...commonPaletteOptions,
      background: {
        default: "#FFFFFF",
        paper: "#F9FAFB",
      },
      text: {
        primary: "#1A221C",
        secondary: "#5E6660",
        disabled: "#7B847E",
      },
      divider: "#E6E9E7",
      grey: {
        1: "#FCFDFC",
        2: "#F7FAF8",
        3: "#EEF1EF",
        4: "#E6E9E7",
        5: "#DEE2DF",
        6: "#D6DBD7",
        7: "#CBD0CC",
        8: "#B7BDB9",
        9: "#868F88",
        10: "#7B847E",
        11: "#5E6660",
        12: "#1A221C",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      },
    },
    typography: {
      fontFamily: ["Nunito", "sans-serif"].join(","),
      fontSize: 13,
      button: {
        textTransform: "none",
      },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiDrawer: {
        defaultProps: {
          PaperProps: {
            className:
              "rounded-none md:rounded-tl-2xl md:rounded-bl-2xl max-w-[480px] w-full bg-red",
          },
        },
      },
      MuiLink: {
        defaultProps: {
          sx(theme) {
            return {
              color: theme.palette.primary.main,
              textDecoration: "underline",
              "&:hover": {
                color: theme.palette.primary.darker,
              },
            };
          },
        },
      },
      MuiCheckbox: {
        defaultProps: {
          color: "default",
        },
      },
      MuiMenu: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          list: {
            '&[role="menu"]': {
              backgroundColor: "var(--mui-palette-grey-1)",
              border: "1px solid var(--mui-palette-grey-5)",
            },
            borderRadius: 23,
          },
        },
      },

      MuiIcon: {
        defaultProps: {
          baseClassName: "material-symbols-rounded",
        },
      },
      MuiDatePicker: {
        defaultProps: {
          format: DateFormat.DEFAULT,
        },
      },
      MuiDesktopDatePicker: {
        defaultProps: {
          format: DateFormat.DEFAULT,
        },
      },
      MuiMobileDatePicker: {
        defaultProps: {
          format: DateFormat.DEFAULT,
        },
      },
      MuiTabs: {
        defaultProps: {
          textColor: "inherit",
          variant: "scrollable",
          scrollButtons: "auto",
          allowScrollButtonsMobile: true,
        },
      },
      MuiLoadingButton: {
        defaultProps: {
          variant: "contained",
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
          variant: "contained",
          shape: "circular",
        },
        variants: [
          {
            props: { shape: "default" },
            style: () => ({ borderRadius: 49 }),
          },
          {
            props: { shape: "square" },
            style: () => ({ borderRadius: 5 }),
          },
          {
            props: { shape: "circular" },
            style: () => ({ borderRadius: 49 }),
          },
          {
            props: { size: "large" },
            style: () => ({ padding: "14px 22px" }),
          },
          {
            props: { size: "medium" },
            style: () => ({ padding: "10px 16px" }),
          },
          {
            props: { size: "small" },
            style: () => ({ padding: "5px 12px" }),
          },
        ],
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            const color = ownerState.color as
              | "primary"
              | "secondary"
              | "success"
              | "error"
              | "info"
              | "warning";

            return {
              ...(!isNaN(Number(ownerState.shape))
                ? { borderRadius: Number(ownerState.shape) }
                : {}),
              ...(ownerState.variant === "soft"
                ? {
                    color:
                      theme.palette[color]?.main || theme.palette.grey[500],
                    backgroundColor: alpha(
                      theme.palette[color]?.main || theme.palette.grey[500],
                      0.2
                    ),
                    "&:hover": {
                      backgroundColor: alpha(
                        theme.palette[color]?.main || theme.palette.grey[500],
                        0.3
                      ),
                    },
                  }
                : {}),
              ...(ownerState.variant === "soft"
                ? {
                    color:
                      theme.palette[color]?.main || theme.palette.grey[500],
                    backgroundColor: alpha(
                      theme.palette[color]?.main || theme.palette.grey[500],
                      0.2
                    ),
                    "&:hover": {
                      backgroundColor: alpha(
                        theme.palette[color]?.main || theme.palette.grey[500],
                        0.3
                      ),
                    },
                  }
                : {}),
            };
          },
        },
      },
      MuiChip: {
        defaultProps: { variant: "soft" },
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            const color = ownerState.color as
              | "primary"
              | "secondary"
              | "success"
              | "error"
              | "info"
              | "warning";

            return {
              ...(ownerState.variant === "soft"
                ? {
                    color:
                      theme.palette[color]?.main || theme.palette.grey[600],
                    backgroundColor: alpha(
                      theme.palette[color]?.main || theme.palette.grey[600],
                      0.2
                    ),
                    "&:hover": {
                      backgroundColor: alpha(
                        theme.palette[color]?.main || theme.palette.grey[500],
                        0.3
                      ),
                    },
                  }
                : {}),
            };
          },
        },
      },
      MuiIconButton: {
        defaultProps: {
          color: "default",
        },
        styleOverrides: {
          root: ({ theme, ownerState }) => {
            const color = ownerState.color as
              | "primary"
              | "secondary"
              | "success"
              | "error"
              | "info"
              | "warning";

            return {
              ...(!isNaN(Number(ownerState.shape))
                ? { borderRadius: Number(ownerState.shape) }
                : {
                    borderRadius: {
                      square: 0,
                      default: 8,
                      circular: undefined,
                    }[ownerState.shape!],
                  }),
              ...(ownerState.variant === "contained"
                ? {
                    color:
                      theme.palette[color]?.contrastText ||
                      theme.palette.text.primary,
                    backgroundColor:
                      theme.palette[color]?.main || theme.palette.grey[500],
                    "&:hover": {
                      backgroundColor:
                        theme.palette[color]?.dark || theme.palette.grey[700],
                    },
                    "&:disabled": {
                      backgroundColor: alpha(
                        theme.palette[color]?.main || theme.palette.grey[500],
                        0.5
                      ),
                    },
                  }
                : {}),
              ...(ownerState.variant === "soft"
                ? {
                    color:
                      theme.palette[color]?.main || theme.palette.grey[500],
                    backgroundColor: alpha(
                      theme.palette[color]?.main || theme.palette.grey[500],
                      0.2
                    ),
                    "&:hover": {
                      backgroundColor: alpha(
                        theme.palette[color]?.main || theme.palette.grey[500],
                        0.3
                      ),
                    },
                  }
                : {}),
              ...(ownerState.variant === "outlined"
                ? {
                    border: `1px solid ${theme.palette.secondary.light}`,
                  }
                : {}),
            };
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
          classes: { asterisk: "text-error-main" },
        },
      },
      MuiFilledInput: {
        defaultProps: { disableUnderline: true },
      },

      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            return {
              "& .iconify": {
                color: (theme.vars || theme).palette.grey[11],
              },

              "& .MuiFormLabel-root": {
                color: (theme.vars || theme).palette.grey[11],
                fontWeight: theme.typography.fontWeightMedium,
              },

              "&:focus-within": {
                "& .MuiFormLabel-root": {
                  color: (theme.vars || theme).palette.grey[11],
                },
              },

              ...(ownerState.variant === "outlined"
                ? {
                    paddingTop: ownerState.label
                      ? ownerState.size === "small"
                        ? 14
                        : 25
                      : undefined,

                    "& .MuiInputLabel-shrink": {
                      transform:
                        ownerState.size === "small"
                          ? "translate(0px, 0px) scale(0.60)"
                          : "translate(0px, 0px) scale(0.80)",
                    },

                    "& .MuiInputBase-root": {
                      backgroundColor: (theme.vars || theme).palette.common
                        .white,
                      borderRadius: 12,

                      "&.Mui-focused fieldset": {
                        borderColor: (theme.vars || theme).palette.grey[6],
                        borderStyle: "solid",
                        borderWidth: 1.3,
                      },

                      "& > fieldset": {
                        borderColor: (theme.vars || theme).palette.grey[5],
                        borderStyle: "solid",
                        borderWidth: 1.3,
                      },

                      "&:hover fieldset": {
                        borderColor: (theme.vars || theme).palette.grey[6],
                      },
                    },
                  }
                : {}),

              ...(ownerState.variant === "filled"
                ? {
                    "& .MuiFilledInput-input": {
                      borderRadius: 12,
                    },

                    "& .MuiInputBase-root": {
                      borderRadius: 12,
                      paddingTop: ownerState.size === "small" ? 1 : 2,
                      paddingBottom: ownerState.size === "small" ? 1 : 2,
                    },
                  }
                : {}),
            };
          },
        },
      },
      MuiOutlinedInput: {
        defaultProps: { notched: false },

        styleOverrides: {
          input: ({ theme }) => ({
            "&:-webkit-autofill": {
              WebkitBoxShadow: `0 0 0 100px ${
                (theme.vars || theme).palette.grey[2]
              } inset`,
              WebkitTextFillColor: "#000000",
            },
          }),
          root: ({ ownerState, theme }) => {
            return {
              paddingTop: ownerState.label
                ? ownerState.size === "small"
                  ? 14
                  : 25
                : undefined,

              backgroundColor: (theme.vars || theme).palette.common.white,
              borderRadius: theme.shape.borderRadius,
            };
          },
        },
      },

      MuiPaper: {
        defaultProps: {
          elevation: 0,
          shape: "circular",
        },
        styleOverrides: {
          root: {
            variants: [
              {
                props: { variant: "outlined" },
                style: ({ theme }) => ({
                  borderWidth: 1.5,
                  borderColor: (theme.vars || theme).palette.grey[4],
                }),
              },
            ],
          },
        },
        variants: [
          {
            props: { shape: "default" },
            style: () => ({}),
          },
          {
            props: { shape: "square" },
            style: () => ({ borderRadius: 0 }),
          },
          {
            props: { shape: "circular" },
            style: () => ({ borderRadius: 24 }),
          },
        ],
      },
      MuiDialog: {
        defaultProps: {
          maxWidth: "sm",
        },
        styleOverrides: {
          paper: ({ theme }) => {
            return {
              backgroundColor: theme.palette.background.default,
            };
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: ({ theme }) => ({
            ...theme.typography.h5,
            fontWeight: "bold",
          }),
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.grey[5],
            color: theme.palette.grey[10],
          }),
        },
      },
      MuiSkeleton: {
        defaultProps: {
          // animation: "wave",
        },
        variants: [
          {
            props: { variant: "rectangular" },
            style: () => ({ borderRadius: 24 }),
          },
        ],
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: "xl",
        },
      },
      MuiLinearProgress: {
        defaultProps: {
          shape: "circular",
        },
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
            variants: [
              {
                props: { shape: "circular" },
                style: () => ({
                  borderRadius: 5,
                  [`& .${linearProgressClasses.bar}`]: {
                    borderRadius: 5,
                  },
                }),
              },
            ],
          },
        },
      },
    },
  })
);

export default theme;

declare module "@mui/material/styles" {
  interface Color {
    1?: string;
    2?: string;
    3?: string;
    4?: string;
    5?: string;
    6?: string;
    7?: string;
    8?: string;
    9?: string;
    10?: string;
    11?: string;
    12?: string;
  }
  interface BreakpointOverrides {
    "2xl": true;
  }

  interface PaletteColor {
    light?: string;
    lighter?: string;
    main?: string;
    dark?: string;
    darker?: string;
    contrastText?: string;
  }

  interface SimplePaletteColorOptions {
    light?: string;
    lighter?: string;
    main?: string;
    dark?: string;
    darker?: string;
    contrastText?: string;
  }
}

declare module "@mui/material/Button" {
  interface ButtonOwnProps {
    shape?: "default" | "circular" | "square";
  }

  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipOwnProps {
    // shape?: "default" | "circular" | "square";
  }

  interface ChipPropsVariantOverrides {
    soft: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonOwnProps {
    variant?: "contained" | "outlined" | "soft";
    shape?: ("default" | "circular" | "square") | number;
  }

  interface IconButtonPropsVariantOverrides {
    soft: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperOwnProps {
    shape?: "default" | "circular" | "square";
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldOwnProps {
    variant?: "standard" | "outlined" | "filled" | "soft";
  }

  interface TextFieldPropsVariantOverrides {
    soft: true;
  }
}

declare module "@mui/material/LinearProgress" {
  interface LinearProgressProps {
    shape?: "default" | "circular" | "square";
  }
}

declare module "@mui/material/ToggleButtonGroup" {
  interface ToggleButtonGroupProps {
    variant?: "standard" | "pill";
    shape?: "default" | "circular" | "square";
  }
}

type Theme = Omit<MuiTheme, "components">;

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey {
    // MuiDatePicker: "root";
  }

  interface ComponentsPropsList {
    MuiDatePicker: Partial<DatePickerProps<never, true>>;
    MuiDesktopDatePicker: Partial<DesktopDatePickerProps<never, true>>;
    MuiMobileDatePicker: Partial<MobileDatePickerProps<never, true>>;
    MuiLoadingButton: Partial<LoadingButtonProps>;
  }

  interface Components {
    MuiDatePicker?: {
      defaultProps?: ComponentsPropsList["MuiDatePicker"];
      //   styleOverrides?: ComponentsOverrides<Theme>["MuiDatePicker"];
      variants?: ComponentsVariants["MuiDatePicker"];
    };
    MuiDesktopDatePicker?: {
      defaultProps?: ComponentsPropsList["MuiDesktopDatePicker"];
      //   styleOverrides?: ComponentsOverrides<Theme>["MuiDesktopDatePicker"];
      variants?: ComponentsVariants["MuiDesktopDatePicker"];
    };
    MuiMobileDatePicker?: {
      defaultProps?: ComponentsPropsList["MuiMobileDatePicker"];
      //   styleOverrides?: ComponentsOverrides<Theme>["MuiMobileDatePicker"];
      variants?: ComponentsVariants["MuiMobileDatePicker"];
    };
    MuiLoadingButton?: {
      defaultProps?: ComponentsPropsList["MuiLoadingButton"];
      //   styleOverrides?: ComponentsOverrides<Theme>["MuiLoadingButton"];
      variants?: ComponentsVariants["MuiLoadingButton"];
    };
  }
}
