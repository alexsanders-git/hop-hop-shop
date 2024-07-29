'use client';
import { useEffect, useState } from 'react';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableUsers from '@/components/dashboard/dashboardTableUsers/DashboardTableUsers';
import { getUsersDashboardServer } from '@/services/dashboard/users/dashboard.users.service';

import styles from './styles.module.scss';

export default function DashboardUsers() {
	const [data, setData] = useState<null | IDashboardUsers>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any>();

	useEffect(() => {
		const getUsers = async () => {
			try {
				const users = await getUsersDashboardServer();
				if (users) {
					setData(users);
					setLoading(false);
				} else {
					setError(users);
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
			<DashboardHeadLine searchType={'users'} compact={true} text={'Users'} />
			{data && <DashboardTableUsers users={data} />}
		</div>
	);
}
