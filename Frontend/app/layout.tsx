import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/context";

const dmSansHeading = DM_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bolsa de Trabajo SENATI",
  description: "Bolsa de trabajo para estudiantes y egresados de SENATI, facilitando la conexión entre talento y oportunidades laborales en el sector tecnológico.",
  icons: {
    icon: [
      { url: "/senati-logo.png", sizes: "32x32", type: "image/png" },
      { url: "/senati-logo.png", sizes: "any", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        publicSans.variable,
        dmSansHeading.variable,
      )}
    >
      <AuthProvider>
        <body className="min-h-full flex flex-col">{children}</body>
      </AuthProvider>
    </html>
  );
}
