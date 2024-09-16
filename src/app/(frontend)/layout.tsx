import type { Metadata } from 'next';
import Script from 'next/script';

import Container from '@/components/Container/Container';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { londrinaSolid } from '@/styles/fonts/fonts';

import '@/styles/reset.scss';
import '@/styles/variables.scss';
import '@/styles/globals.scss';

import styles from './page.module.scss';
import Initializer from '@/components/initializer';

export const metadata: Metadata = {
	title: 'HopHopShop',
	description: 'Where Every Hop Counts for Cool EDC Gear!',
};

export default function RootLayout({
	children,
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

				<Initializer />

				<Script id="clarity-script" strategy="afterInteractive">
					{`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
          `}
				</Script>
			</body>
		</html>
	);
}
