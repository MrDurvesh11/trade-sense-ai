import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Trade Sense AI"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100"}
      >{children}</body>
    </html>
  );
}
