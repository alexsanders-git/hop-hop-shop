'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { getDashboardNewsId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

interface IProps {
	news: INews[];
}

interface IDashboardItem {
	setNewData: (data: INews[]) => void;
	item: INews;
}

const PageSize = 10;
export default function DashboardTableNews(props: IProps) {
	const { news } = props;
	const [newData, setNewData] = useState<INews[]>(news);

	const header = [
		{ name: 'News ID' },
		{ name: 'Title' },
		{ name: 'Date' },
		{ name: 'Actions' },
	];
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<ul className={styles.responsiveTable}>
					<li className={`${styles.tableHeader}`}>
						{header.map((item, i) => (
							<div key={i} className={`${styles.col} ${styles[`col${i + 1}`]}`}>
								{item.name}
							</div>
						))}
					</li>
					{newData?.map((item, index: number) => (
						<DashboardItem item={item} setNewData={setNewData} key={index} />
					))}
				</ul>
			</div>
			{/*{newData?.items_count > PageSize ? (*/}
			{/*	<Pagination*/}
			{/*		currentPage={newData?.pagination?.current_page}*/}
			{/*		totalCount={newData?.items_count}*/}
			{/*		pageSize={PageSize}*/}
			{/*		onPageChange={async (page) => {*/}
			{/*			const res = await getDashboardCategories(page);*/}
			{/*			setNewData(res);*/}
			{/*		}}*/}
			{/*	/>*/}
			{/*) : null}*/}
		</div>
	);
}

function DashboardItem(props: IDashboardItem) {
	const { setNewData, item } = props;
	const [isShow, setIsShow] = useState<boolean>(false);
	return (
		<>
			{isShow && (
				<ModalConfirmation
					reset={async () => {
						// await removeNewsById(item.id).finally(async () => {
						// 	const news = await getNews();
						// 	setNewData(news);
						// 	setIsShow(false);
						// });
					}}
					closeModal={() => setIsShow(false)}
					text={'Are you sure?'}
				/>
			)}
			<li className={`${styles.tableRow} ${robotoCondensed.className}`}>
				<div className={`${styles.col} ${styles.col1}`}>#{item.id}</div>
				<div className={`${styles.col} ${styles.col2}`}>{item.title}</div>
				<div className={`${styles.col} ${styles.col3}`}>{item.date}</div>
				<div className={`${styles.col} ${styles.col4}`}>
					<RemoveButton callback={() => setIsShow(true)} />
					<EditButton callback={() => getDashboardNewsId(item.id)} />
				</div>
			</li>
		</>
	);
}
