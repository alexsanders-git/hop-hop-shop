import { notFound } from 'next/navigation';

import { getOderById } from '@/services/dashboard/orders/dashboard.orders.service';
import DashboardOrderDetails from '@/template/dashboardOrderDetails/DashboardOrderDetails';
import type { Metadata } from 'next';
import { getNewsById } from '@/services/dashboard/news/dashbpard.news.service';

type Props = {
	params: {
		id: string;
	};
};

export async function generateMetadata({
	params: { id },
}: Props): Promise<Metadata> {
	const order = await getOderById(Number(id));

	if (!order.success) {
		return notFound();
	}

	return {
		title: `Edit ${order.data.id} - HopHopShop Dashboard`,
	};
}

export default async function DashboardOrderEdit({ params: { id } }: Props) {
	const order = await getOderById(Number(id));
	if (!order.success) {
		return notFound();
	}
	return <DashboardOrderDetails order={order.data} id={id} />;
}
