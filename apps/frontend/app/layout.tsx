import type { Metadata } from "next";
import { Funnel_Sans,Syne_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";

const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-funnel",
});

const syneMono = Syne_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "NeuroInbox",
  description: "NeuroInbox",
  icons:{
    icon:"/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${funnelSans.variable} ${syneMono.variable} antialiased `+"scrollbar"}
      >
        
          <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
