import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "🐾 Uyển Nhi & Corgi - Vương Quốc Toán Học",
  description: "Game học Toán lớp 3 vui nhộn cùng bạn Corgi béo ú!",
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
