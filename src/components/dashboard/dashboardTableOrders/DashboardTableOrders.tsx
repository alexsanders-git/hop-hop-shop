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

export default function DashboardTableOrders(props: IProps) {
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
		{ name: 'Order ID', mobileName: 'Ord...' },
		{ name: 'Product', mobileName: 'Prd...' },
		{ name: 'Category', mobileName: 'Cat...' },
		{ name: 'Date', mobileName: 'Dat...' },
		{ name: 'Status', mobileName: 'Sta...' },
		{ name: 'Quantity', mobileName: 'Qty...' },
		{ name: 'Price', mobileName: 'Pri...' },
		{ name: '', mobileName: '' },
	];

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<ul className={styles.responsiveTable}>
					<li className={`${styles.tableHeader} ${styles.first} `}>
						{header.map((item, i) => (
							<div key={i} className={`${styles.col} ${styles[`col${i + 1}`]}`}>
								{item.name}
							</div>
						))}
					</li>
					<li className={`${styles.tableHeader} ${styles.second} `}>
						{header.map((item, i) => (
							<div key={i} className={`${styles.col} ${styles[`col${i + 1}`]}`}>
								{item.mobileName}
							</div>
						))}
					</li>
					{currentTableData.map((item: any, index: number) => (
						<li
							key={index}
							className={`${styles.tableRow} ${robotoCondensed.className}`}
						>
							<div className={`${styles.col} ${styles.col1}`}>{item.id}</div>
							<div className={`${styles.col} ${styles.col2}`}>
								{item.product}
							</div>
							<div className={`${styles.col} ${styles.col3}`}>
								{item.category}
							</div>
							<div className={`${styles.col} ${styles.col4}`}>{item.date}</div>
							<div className={`${styles.col} ${styles.col5}`}>
								{item.status}
							</div>
							<div className={`${styles.col} ${styles.col6}`}>
								{item.quantity}
							</div>
							<div className={`${styles.col} ${styles.col7}`}>{item.price}</div>
							<div className={`${styles.col} ${styles.col8}`}>
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
