import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SupabaseListener from './components/supabase-listener';
import { CartProvider } from './components/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '天心',
  description: '静岡県御殿場市 中華天心',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-secondary-light text-primary-dark dark:bg-primary-dark dark:text-secondary-light transition duration-300 ">
          <SupabaseListener />
          <main className="flex-1 container max-w-screen-md mx-auto px-1 py-5">
            <CartProvider>{children}</CartProvider>
          </main>

          <footer className="py-5">
            <div className="text-center text-sm text-gray-400">
              Copyright © All rights reserved | 中華 天心
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
