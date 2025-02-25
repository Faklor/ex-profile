import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dmitry Matveyev | IP/IT Legal Virtuoso",
  description: "A digital tribute to Dmitry Matveyev - Leading IP/IT Partner recognized by Chambers Europe",
  keywords: "Dmitry Matveyev, IP lawyer, IT lawyer, Legal Partner, Russian Law",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
