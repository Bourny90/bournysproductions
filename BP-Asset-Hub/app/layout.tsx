import type { Metadata } from 'next';
import '../global.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'BP Asset Hub | Premium Roblox Assets & Development Resources',
  description: 'Discover high-quality scripts, vehicles, maps, UI systems, and complete solutions for your Roblox projects.',
  keywords: 'Roblox, assets, scripts, marketplace, development',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
