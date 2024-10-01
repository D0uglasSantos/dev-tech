import "./globals.css";
import type { Metadata } from "next";
import ClientProvider from "./ClientProvider";

export const metadata: Metadata = {
  title: "DevTech",
  description: "Tudo em um só lugar!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
