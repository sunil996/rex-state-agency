import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { ThemeScript } from "@/components/site/ThemeScript";
import { StoreProvider } from "@/lib/store";
import { ThemeProvider } from "@/lib/theme";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Rex Estate Agents | Lettings & Property Management",
    template: "%s | Rex Estate Agents",
  },
  description:
    "Independent lettings and property management in London and Southampton. Helping landlords let with confidence and tenants find the right home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${syne.variable} ${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-full antialiased">
        <StoreProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
