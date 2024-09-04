import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';

import styles from './page.module.scss';

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>Dashboard</h1>
			<EmptyDataBlock />
		</main>
	);
}
