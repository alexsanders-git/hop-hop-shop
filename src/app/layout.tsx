import type { Metadata } from 'next';

import { londrinaSolid } from '@/styles/fonts/fonts';

import styles from './page.module.scss';

import '@/styles/reset.scss';
import '@/styles/variables.scss';
import '@/styles/globals.scss';
import Header from '@/components/Header/Header';
import Container from '@/components/Container/Container';
import Footer from '@/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'HopHopShop',
  description: 'Where Every Hop Counts for Cool EDC Gear!'
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={londrinaSolid.className}>
        <div className={styles.bodyInner}>
          <Header />
          <main className={styles.main}>
            <Container>
              <div className={styles.wrapper}>{children}</div>
            </Container>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
