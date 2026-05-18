import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/context/context";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('theme');
                const sysThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (storedTheme === 'dark' || (!storedTheme && sysThemeDark)) {
                  document.documentElement.classList.add('dark');
                  // Si no había tema guardado, lo guardamos basado en el sistema
                  if (!storedTheme) localStorage.setItem('theme', 'dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  if (!storedTheme) localStorage.setItem('theme', 'light');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-white dark:bg-[#1e2124] text-black dark:text-white transition-colors duration-300 min-h-screen`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
