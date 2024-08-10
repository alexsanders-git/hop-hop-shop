'use client';
import { useState } from 'react';

import Pagination from '@/components/dashboard/pagination/Pagination';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { getDashboardOrdersId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './OrdersForm.module.scss';

interface IProps {
	orders: IResponse<IOrders>;
}

export default function OrdersForm(props: IProps) {
	const { orders } = props;

	const [newData, setNewData] = useState<IResponse<IOrders>>(orders);

	const header = [
		{ name: 'Order ID' },
		{ name: 'Status' },
		{ name: 'Quantity' },
		{ name: 'Price' },
		{ name: 'Date' },
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
							<div className={`${styles.col} ${styles.col2}`}>
								{item.status}
							</div>
							<div className={`${styles.col} ${styles.col3}`}>
								{item.total_quantity}
							</div>
							<div className={`${styles.col} ${styles.col4}`}>
								{item.total_price}
							</div>
							<div className={`${styles.col} ${styles.col5}`}>
								{item.created_at}
							</div>
						</li>
					))}
				</ul>
			</div>
			{newData?.items?.length > 0 ? (
				<Pagination
					currentPage={newData?.pagination?.current_page}
					totalCount={newData?.items_count}
					pageSize={10}
					onPageChange={async (page) => {
						const res = await getDashboardOrdersId(page);
						setNewData(res);
					}}
				/>
			) : null}
		</div>
	);
}
