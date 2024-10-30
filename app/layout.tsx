import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gestion Hôtels',
  description: 'Système de gestion hôtelière',
};

// Routes qui ne doivent pas avoir de sidebar
//const publicRoutes = ['/', '/login', '/register', '/forgot-password','/newhotel'];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // En production, vous utiliserez usePathname() pour vérifier la route
  const isPublicRoute = true; // Pour l'instant, forcer à true pour la page de login

  return (
    <html lang="fr">
      <body className={inter.className}>
        {isPublicRoute ? (
          children
        ) : (
          <div className="flex">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
        )}
      </body>
    </html>
  );
}