import type { Metadata } from 'next';
import Script from 'next/script';

import Container from '@/components/Container/Container';
import DashboardFooter from '@/components/dashboard/dashboardFooter/DashboardFooter';
import DashboardHeader from '@/components/dashboard/dashboardHeader/DashboardHeader';
import DashboardSidebar from '@/components/dashboard/dashboardSidebar/DashboardSidebar';
import { londrinaSolid } from '@/styles/fonts/fonts';

import '@/styles/reset.scss';
import '@/styles/variables.scss';
import '@/styles/globals.scss';

import styles from './page.module.scss';

export const metadata: Metadata = {
	title: 'HopHopShop Dashboard',
	description: 'Generated by create next app',
};

export default function DashboardLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className={londrinaSolid.className}>
				<div className={styles.bodyInner}>
					<DashboardHeader />
					<Container className={styles.container}>
						<main className={styles.main}>
							<DashboardSidebar />
							<div className={styles.wrapper}>{children}</div>
						</main>
						<DashboardFooter />
					</Container>
				</div>

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
