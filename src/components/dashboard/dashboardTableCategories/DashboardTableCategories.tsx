'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Pagination from '@/components/dashboard/pagination/Pagination';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';
import {
	getDashboardCategories,
	removeCategoryById,
} from '@/services/dashboard/categories/dashboard.categories.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import { getDashboardCategoriesId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

interface IProps {
	categories: IResponse<ICategory>;
}

interface IDashboardItem {
	setNewData: (data: IResponse<ICategory>) => void;
	item: ICategory;
}

const PageSize = 10;
export default function DashboardTableCategories(props: IProps) {
	const { categories } = props;
	const [newData, setNewData] = useState<IResponse<ICategory>>(categories);

	const header = [
		{ name: 'ID' },
		{ name: 'Category' },
		{ name: 'Description' },
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
					{newData?.items?.map((item, index: number) => (
						<DashboardItem item={item} setNewData={setNewData} key={index} />
					))}
				</ul>
			</div>
			{newData?.items_count > PageSize ? (
				<Pagination
					currentPage={newData?.pagination?.current_page}
					totalCount={newData?.items_count}
					pageSize={PageSize}
					onPageChange={async (page) => {
						const res = await getDashboardCategories(page);
						if (res.success) {
							setNewData(res.data);
						}
					}}
				/>
			) : null}
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
						const res = await removeCategoryById(item.id);
						if (res.success) {
							const categories = await getDashboardCategories(1);
							if (categories.success) {
								setNewData(categories.data);
								setIsShow(false);
								await revalidateFunc('/dashboard/categories');
								await revalidateFunc('/');
							}
						}
					}}
					closeModal={() => setIsShow(false)}
					text={'Are you sure?'}
				/>
			)}
			<li className={`${styles.tableRow} ${robotoCondensed.className}`}>
				<div className={`${styles.col} ${styles.col1}`}>#{item.id}</div>
				<div className={`${styles.col} ${styles.col2}`}>{item.name}</div>
				<div className={`${styles.col} ${styles.col3}`}>{item.name}</div>
				<div className={`${styles.col} ${styles.col4}`}>
					<RemoveButton callback={() => setIsShow(true)} />
					<EditButton callback={() => getDashboardCategoriesId(item.id)} />
				</div>
			</li>
		</>
	);
}
