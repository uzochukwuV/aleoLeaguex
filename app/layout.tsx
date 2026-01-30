import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { WalletProvider } from '@/components/providers/wallet-provider';

const geistSans = Geist({ subsets: ['latin'] });
const geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Premier League Betting | Aleo Privacy Dapp',
  description: 'Privacy-first decentralized betting platform on Aleo blockchain with multi-bet parlays, real-time odds, and secure transactions.',
  keywords: 'Aleo, blockchain, betting, sports, privacy, dapp, Premier League',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} bg-background text-foreground antialiased`}>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
