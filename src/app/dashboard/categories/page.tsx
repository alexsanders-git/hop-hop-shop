import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableCategories from '@/components/dashboard/dashboardTableCategories/DashboardTableCategories';

import styles from './styles.module.scss';

const data = [
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
	{
		category: 'Books',
		description: 'Books, comics, magazines, other publications',
		status: 'Shown',
	},
];
export default function DashboardProducts() {
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				compact={false}
				text={'Categories'}
				textButton={'New category'}
			/>
			<DashboardTableCategories data={data} />
		</div>
	);
}
