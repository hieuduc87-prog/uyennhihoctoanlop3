import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🏰 Vương Quốc Học Giỏi",
  description: "Game học Toán · Tiếng Việt · English cùng thú cưng dễ thương!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
