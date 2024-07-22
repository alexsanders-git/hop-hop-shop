import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableProducts from '@/components/dashboard/dashboardTableProducts/DashboardTableProducts';
import { getProducts } from '@/services/fetchData';

import styles from './styles.module.scss';

export default async function DashboardProducts() {
	const products = await getProducts();
	if (!products) {
		notFound();
	}
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				compact={false}
				text={'Products'}
				textButton={'New Product'}
			/>
			<DashboardTableProducts data={products} />
		</div>
	);
}
