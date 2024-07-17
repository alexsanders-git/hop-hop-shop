import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableProducts from '@/components/dashboard/dashboardTableProducts/DashboardTableProducts';

import styles from './styles.module.scss';

const data = [
	{
		product: 'ScienceScienceScienceScience Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'ScienceScienceScienceScience Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
	{
		product: 'Science Fiction Book',
		category: 'Books',
		quantity: '12pcs',
		price: '$120',
	},
];

export default function DashboardProducts() {
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				compact={false}
				text={'Products'}
				textButton={'New Product'}
			/>
			<DashboardTableProducts data={data} />
		</div>
	);
}
