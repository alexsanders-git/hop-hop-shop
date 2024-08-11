'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import Pagination from '@/components/dashboard/pagination/Pagination';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';
import {
	getCategories,
	getDashboardCategories,
	removeCategoryById,
} from '@/services/dashboard/categories/dashboard.categories.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { getDashboardCategoriesId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

interface IProps {
	categories: IResponse<ICategory>;
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
						<li
							key={index}
							className={`${styles.tableRow} ${robotoCondensed.className}`}
						>
							<div className={`${styles.col} ${styles.col1}`}>#{item.id}</div>
							<div className={`${styles.col} ${styles.col2}`}>{item.name}</div>
							<div className={`${styles.col} ${styles.col3}`}>{item.name}</div>
							<div className={`${styles.col} ${styles.col4}`}>
								<RemoveButton
									callback={async () => {
										await removeCategoryById(item.id).finally(async () => {
											const categories = await getCategories();
											setNewData(categories);
										});
									}}
								/>
								<EditButton
									callback={() => getDashboardCategoriesId(item.id)}
								/>
							</div>
						</li>
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
						setNewData(res);
					}}
				/>
			) : null}
		</div>
	);
}
