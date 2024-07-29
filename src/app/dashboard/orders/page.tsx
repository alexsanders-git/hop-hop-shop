import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableOrders from '@/components/dashboard/dashboardTableOrders/DashboardTableOrders';
import { getOrdersDashboardServer } from '@/services/dashboard/orders/dashboard.orders.service';

import styles from './styles.module.scss';

export default async function DashboardOrders() {
	const orders = await getOrdersDashboardServer();

	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine compact={true} text={'Orders'} searchType={'orders'} />
			<DashboardTableOrders orders={orders} />
		</div>
	);
}
