'use client';
import { useEffect, useState } from 'react';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableOrders from '@/components/dashboard/dashboardTableOrders/DashboardTableOrders';
import { getOrdersDashboardServer } from '@/services/dashboard/orders/dashboard.orders.service';

import styles from './styles.module.scss';

export default function DashboardOrders() {
	const [data, setData] = useState<null | IResponse<IOrders>>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any>();

	useEffect(() => {
		const getUsers = async () => {
			try {
				const orders = await getOrdersDashboardServer();
				if (orders) {
					setData(orders);
					setLoading(false);
				} else {
					setError(orders);
					setLoading(false);
				}
			} catch (e) {
				console.log(e);
				setError(e);
				setLoading(false);
			}
		};
		getUsers();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {error}</div>;
	}
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine compact={true} text={'Orders'} searchType={'orders'} />
			{data && <DashboardTableOrders orders={data} />}
		</div>
	);
}
