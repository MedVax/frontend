import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 13,
  borderRadius: 30,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#ffffff",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 30,
    backgroundColor: "var(--color-primary-main)",
  },
}));
