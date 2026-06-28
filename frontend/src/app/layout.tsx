import type { Metadata } from "next";
import { AuthProvider } from "@/providers/auth-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "MyNotes",
  description: "Gerenciador de anotações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="min-h-full flex flex-col">
          <AuthProvider>
            {children}
          </AuthProvider>
      </body>
    </html>
  );
}
