import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableUsers from '@/components/dashboard/dashboardTableUsers/DashboardTableUsers';
import { getUsersDashboardServer } from '@/services/dashboard/users/dashboard.users.service';

import styles from './styles.module.scss';

export default async function DashboardUsers() {
	const users = await getUsersDashboardServer();
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine searchType={'users'} compact={true} text={'Users'} />
			<DashboardTableUsers users={users} />
		</div>
	);
}
