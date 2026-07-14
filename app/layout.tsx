import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "jose brusa - developer",
  description: "landingpage de mi propio portfolio.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
