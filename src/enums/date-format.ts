export enum DateFormat {
  DEFAULT = "yyyy-MM-dd",
  SPACE_dd_MMM = "dd MMM",
  SPACE_dd_MMMM_yyyy = "dd MMMM yyyy",
  SPACE_dd_MMM_yyyy = "dd MMM yyyy",
  SPACE_MMMM_yyyy = "MMMM yyyy",
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  HYPHEN_yyyy_MM_dd = "yyyy-MM-dd",
  HYPHEN_dd_MM_yyyy = "dd-MM-yyyy",
  HYPHEN_MM_ddd_yyyy = "MM-ddd-yyyy",
}

export default DateFormat;
