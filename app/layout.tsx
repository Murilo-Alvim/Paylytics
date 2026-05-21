import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Paylytics — Real-time payment analytics",
    template: "%s · Paylytics",
  },
  description:
    "Plataforma SaaS de monitoramento e análise de transações financeiras em tempo real para fintechs modernas.",
  keywords: [
    "fintech",
    "payments",
    "analytics",
    "dashboard",
    "Paylytics",
    "transactions",
  ],
  authors: [{ name: "Paylytics" }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "Paylytics",
    description: "Real-time payment analytics for modern fintechs.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
