'use client';
import { useMemo, useState } from 'react';

import Edit from '@/assets/svg/edit.svg';
import Remove from '@/assets/svg/remove.svg';
import Pagination from '@/components/dashboard/pagination/Pagination';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';

interface IProps {
	data: any;
}

export default function DashboardTableCategories(props: IProps) {
	const { data } = props;
	let PageSize = 10;
	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return data.slice(firstPageIndex, lastPageIndex);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	const width = window.innerWidth;

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<ul className={styles.responsiveTable}>
					<li className={styles.tableHeader}>
						<div className={`${styles.col} ${styles.col1}`}>
							{width > 500 ? 'Category' : 'Cate...'}
						</div>
						<div className={`${styles.col} ${styles.col2}`}>
							{width > 500 ? 'Description' : 'Desc...'}
						</div>
						<div className={`${styles.col} ${styles.col3}`}>
							{width > 500 ? 'Status' : 'Sta...'}
						</div>
						<div className={`${styles.col} ${styles.col4}`}></div>
					</li>
					{currentTableData.map((item: any, index: number) => (
						<li
							key={index}
							className={`${styles.tableRow} ${robotoCondensed.className}`}
						>
							<div className={`${styles.col} ${styles.col1}`}>
								{item.category}
							</div>
							<div className={`${styles.col} ${styles.col2}`}>
								{item.description}
							</div>
							<div className={`${styles.col} ${styles.col3}`}>
								{item.status}
							</div>
							<div className={`${styles.col} ${styles.col4}`}>
								<div className={styles.iconWrapper}>
									<Remove />
								</div>
								<div className={styles.iconWrapper}>
									<Edit />
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
			<Pagination
				currentPage={currentPage}
				totalCount={data.length}
				pageSize={PageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
}
