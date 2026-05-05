import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Volta",
  description: "Um app pessoal para voltar ao essencial todos os dias.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
