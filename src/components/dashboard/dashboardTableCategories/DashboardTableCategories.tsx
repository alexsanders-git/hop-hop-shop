'use client';
import { useMemo, useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import Pagination from '@/components/dashboard/pagination/Pagination';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';
import { removeCategoryById } from '@/services/dashboard/categories/dashboard.categories.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { getDashboardCategoriesId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

interface IProps {
	categories: IDashboardCategories;
}

export default function DashboardTableCategories(props: IProps) {
	const { categories } = props;
	const PageSize = 7;
	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return categories.items.slice(firstPageIndex, lastPageIndex);
	}, [categories.items, currentPage]);

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
					{currentTableData?.map((item, index: number) => (
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
										const res = await removeCategoryById(item.id);
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
			{currentTableData.length > 0 ? (
				<Pagination
					currentPage={currentPage}
					totalCount={categories.items_count}
					pageSize={PageSize}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			) : null}
		</div>
	);
}
