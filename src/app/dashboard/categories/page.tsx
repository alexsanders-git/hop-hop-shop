import { notFound } from 'next/navigation';

import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableCategories from '@/components/dashboard/dashboardTableCategories/DashboardTableCategories';
import { getCategories } from '@/services/fetchData';

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
export default async function DashboardProducts() {
	const categories = await getCategories();
	if (!categories) {
		return notFound();
	}
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				compact={false}
				text={'Categories'}
				textButton={'New category'}
			/>
			<DashboardTableCategories data={categories} />
		</div>
	);
}
