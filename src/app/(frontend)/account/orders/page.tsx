import type { Metadata } from 'next';

import AccountMenu from '@/components/account-menu';

import styles from './page.module.scss';

export const metadata: Metadata = {
	title: `Orders - ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function AccountPage() {
	return (
		<div className={styles.page}>
			<AccountMenu className={styles.menu} />

			<h1 className={styles.title}>Orders History</h1>
		</div>
	);
}
