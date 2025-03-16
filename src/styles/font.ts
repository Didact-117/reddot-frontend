import { Roboto } from "next/font/google";
import localFont from "next/font/local";

// Roboto from Google Fonts
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"], // Regular & Bold
  variable: "--font-roboto",
});

// Brick Sans (local font)
export const brickSans = localFont({
  src: "../../public/fonts/BrickSans.woff2", // Place the font file here
  variable: "--font-brick-sans",
});