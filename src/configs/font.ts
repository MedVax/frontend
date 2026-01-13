import { DM_Sans, Nunito } from "next/font/google";

export const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});

export const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
});