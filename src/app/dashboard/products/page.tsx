import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableProducts from '@/components/dashboard/dashboardTableProducts/DashboardTableProducts';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';
import { getProductsDashboardServer } from '@/services/dashboard/products/dashboard.products.service';
import { isValid } from '@/utils/func/isValid';
import { getDashboardProductsCreate } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

export default async function DashboardProducts() {
	const products = await getProductsDashboardServer();
	if (!isValid<IResponse<IProduct>>(products)) {
		return notFound();
	}

	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				compact={false}
				text={'Products'}
				textButton={'New Product'}
				buttonLink={getDashboardProductsCreate()}
				searchType={'products'}
			/>
			{products && products.items.length > 0 ? (
				<DashboardTableProducts products={products} />
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
