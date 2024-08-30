import DashboardHeadLine from '@/components/dashboard/dashboardHeadLine/DashboardHeadLine';
import DashboardTableNews from '@/components/dashboard/dashboardTableNews/DashboardTableNews';
import EmptyDataBlock from '@/components/dashboard/emptyDataBlock/EmptyDataBlock';
import { getDashboardNewsCreate } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

export default async function DashboardNews() {
	// const news = await getDashboardNewsServer();
	// if (!news) {
	// 	return notFound();
	// }
	const news = [
		{
			id: 1,
			title: 'How the BladeMaster X Transformed Lives...',
			date: '2024-10-02',
		},
		{
			id: 1,
			title: 'How the BladeMaster X Transformed Lives...',
			date: '2024-10-02',
		},
		{
			id: 1,
			title: 'How the BladeMaster X Transformed Lives...',
			date: '2024-10-02',
		},
		{
			id: 1,
			title: 'How the BladeMaster X Transformed Lives...',
			date: '2024-10-02',
		},
		{
			id: 1,
			title: 'How the BladeMaster X Transformed Lives...',
			date: '2024-10-02',
		},
		{
			id: 1,
			title: 'How the BladeMaster X Transformed Lives...',
			date: '2024-10-02',
		},
		{
			id: 1,
			title: 'How the BladeMaster X Transformed Lives...',
			date: '2024-10-02',
		},
		{
			id: 1,
			title: 'How the BladeMaster X Transformed Lives...',
			date: '2024-10-02',
		},
	];
	return (
		<div className={styles.wrapper}>
			<DashboardHeadLine
				compact={false}
				text={'News'}
				textButton={'Add news'}
				buttonLink={getDashboardNewsCreate()}
				searchType={'news'}
			/>
			{news.length > 0 ? (
				<DashboardTableNews news={news} />
			) : (
				<EmptyDataBlock />
			)}
		</div>
	);
}
