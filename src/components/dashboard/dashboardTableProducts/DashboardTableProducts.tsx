'use client';
import { useMemo, useState } from 'react';

import Edit from '@/assets/svg/edit.svg';
import Remove from '@/assets/svg/remove.svg';
import Pagination from '@/components/dashboard/pagination/Pagination';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';

interface IProps {
	data: IProduct[];
}

export default function DashboardTableProducts(props: IProps) {
	const { data } = props;
	let PageSize = 10;
	const [currentPage, setCurrentPage] = useState(1);

	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return data.slice(firstPageIndex, lastPageIndex);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	const header = [
		{ name: 'ID', mobileName: 'Pro...' },
		{ name: 'Product', mobileName: 'Pro...' },
		{ name: 'Category', mobileName: 'Cat...' },
		{ name: 'Price', mobileName: 'Pri...' },
		{ name: 'Actions', mobileName: '' },
	];

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<ul className={styles.responsiveTable}>
					<li className={`${styles.tableHeader} `}>
						{header.map((item, i) => (
							<div key={i} className={`${styles.col} ${styles[`col${i + 1}`]}`}>
								{item.name}
							</div>
						))}
					</li>
					{currentTableData.map((item, index: number) => (
						<li
							key={index}
							className={`${styles.tableRow} ${robotoCondensed.className}`}
						>
							<div
								className={`${styles.col} ${styles.col1}`}
								data-label="Product"
							>
								#{item.id}
							</div>
							<div
								className={`${styles.col} ${styles.col2}`}
								data-label="Category"
							>
								{item.name}
							</div>
							<div
								className={`${styles.col} ${styles.col3}`}
								data-label="Quantity"
							>
								{item.category.name}
							</div>
							<div
								className={`${styles.col} ${styles.col4}`}
								data-label="Price"
							>
								{item.price}$
							</div>
							<div className={`${styles.col} ${styles.col5}`}>
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
