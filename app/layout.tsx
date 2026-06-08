import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ListifyPH — Write less. Sell more.",
  description:
    "AI-powered property listing generator for real estate agents in the Philippines.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
