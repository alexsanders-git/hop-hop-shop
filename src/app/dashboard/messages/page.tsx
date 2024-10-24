import styles from './styles.module.scss';

import { getAllMessagesDashboard } from '@/services/dashboard/coupons/dashboard.coupons.service';

export default async function page() {
	const messages = await getAllMessagesDashboard();
	// console.log(messages);

	// if (!messages.success) {
	// 	return notFound();
	// }

	return (
		<div className={styles.wrapper}>
			Messages
			{/* {messages.data.items.length > 0 ? (
                <DashboardTableMessages messages={messages.data} />
            ) : (
                <EmptyDataBlock />
            )} */}
		</div>
	);
}
