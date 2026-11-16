
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thiên Đường Hẹn Hò",
  description: "Tìm kiếm một nửa yêu thương của bạn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          background: "#fff5f7",
        }}
      >
        {children}
      </body>
    </html>
  );
}
