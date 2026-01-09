import theme from "tailwindcss/defaultTheme";

export const MediaQueryBreakpointEnum = {
  "2xl": `(min-width: ${theme.screens["2xl"]})`,
  lg: `(min-width: ${theme.screens.lg})`,
  md: `(min-width: ${theme.screens.md})`,
  sm: `(min-width: ${theme.screens.sm})`,
  xl: `(min-width: ${theme.screens.xl})`,
};

export const COMPANY_NAME = "FusionDesk";
export const APP_SIDE_MENU_WIDTH = 230;
export const TICKET_FILTER_SIDE_MENU_WIDTH = 300;

export const PaginationDefault = {
  offset: 0,
  limit: 10,
};

export const defaultOrganization = "FusionDesk";

export const defaultGlobalConfirmDialogOptions = {
  confirmButtonText: "Confirm",
  cancelButtonText: "Cancel",
  confirmButtonProps: {
    color: "error",
  },
  cancelButtonProps: {
    color: "primary",
    variant: "outlined",
    autoFocus: true,
  },
};

export const DOCUMENT_EXTENSION = {
  PDF: "pdf",
  IMG: "img",
  JPG: "jpg",
  PNG: "png",
  JPEG: "jpeg",
  MP3: "mp3",
  MP4: "mp4",
  DOCX: "docx",
  TXT: "txt",
  CSV: "csv",
};

export const DOCUMENT_TYPE = {
  IMG: "image/jpeg,image/png,image/jpg",
  PDF: "application/pdf",
  MP3: "audio/mp3,audio/mpeg,audio/x-mpeg,audio/mpg,audio/x-mpg,audio/mpeg3",
  MP4: "video/mp4,video/x-m4v",
};
