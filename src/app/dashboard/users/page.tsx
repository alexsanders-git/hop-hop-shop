import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableUsers from '@/components/dashboard/dashboardTableUsers/DashboardTableUsers';

import styles from './styles.module.scss';

const data = [
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
	{
		userId: '#31533',
		name: 'John Doe',
		email: 'john@mail.com',
	},
];
export default function DashboardProducts() {
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine compact={true} text={'Users'} />
			<DashboardTableUsers data={data} />
		</div>
	);
}
