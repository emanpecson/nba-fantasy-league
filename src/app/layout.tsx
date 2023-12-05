import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'NBA Fantasy League',
  description: 'by Emanuel Pecson',
};
// used for keywords searches via google
// note: should not manually add <head> tags, instead refer to metadata API

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full bg-gradient-to-b from-white to-gray-200">
      <body>
        <div className="h-screen py-10 px-10">{children}</div>
      </body>
    </html>
  );
}
