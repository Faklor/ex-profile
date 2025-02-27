import { Inter } from "next/font/google";
import "./globals.css";
import ClientParticles from '@/components/ClientParticles';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dmitry Matveyev | IP/IT Legal Virtuoso",
  description: "A digital tribute to Dmitry Matveyev - Leading IP/IT Partner recognized by Chambers Europe",
  keywords: "Dmitry Matveyev, IP lawyer, IT lawyer, Legal Partner, Russian Law",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientParticles />
        {children}
      </body>
    </html>
  );
}
