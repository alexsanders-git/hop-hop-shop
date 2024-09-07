'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Pagination from '@/components/dashboard/pagination/Pagination';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';
import {
	getDashboardOrders,
	removeOrderById,
} from '@/services/dashboard/orders/dashboard.orders.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { formatDate } from '@/utils/func/formatDate';
import { getDashboardOrdersId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

interface IProps {
	orders: IResponse<IOrders>;
}

interface IDashboardItem {
	item: IOrders;
	setNewData: (data: IResponse<IOrders>) => void;
}

export default function DashboardTableOrders(props: IProps) {
	const { orders } = props;

	const [newData, setNewData] = useState<IResponse<IOrders>>(orders);

	const header = [
		{ name: 'Order ID' },
		{ name: 'Status' },
		{ name: 'Quantity' },
		{ name: 'Price' },
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
					{newData?.items?.map((item, index: number) => (
						<DashboardItem key={index} item={item} setNewData={setNewData} />
					))}
				</ul>
			</div>
			{newData?.items?.length > 0 ? (
				<Pagination
					currentPage={newData?.pagination?.current_page}
					totalCount={newData?.items_count}
					pageSize={10}
					onPageChange={async (page) => {
						const res = await getDashboardOrders(page);
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
						const res = await removeOrderById(item.id);
						if (res.success) {
							const orders = await getDashboardOrders(1);
							if (orders.success) {
								setNewData(orders.data);
								setIsShow(false);
							}
						}
					}}
					closeModal={() => setIsShow(false)}
					text={'Are you sure?'}
				/>
			)}
			<li className={`${styles.tableRow} ${robotoCondensed.className}`}>
				<div className={`${styles.col} ${styles.col1}`}>#{item.id}</div>
				<div className={`${styles.col} ${styles.col2}`}>{item.status}</div>
				<div className={`${styles.col} ${styles.col3}`}>
					{item.total_quantity}
				</div>
				<div className={`${styles.col} ${styles.col4}`}>{item.total_price}</div>
				<div className={`${styles.col} ${styles.col5}`}>
					{formatDate(item.created_at)}
				</div>
				<div className={`${styles.col} ${styles.col6}`}>
					<RemoveButton callback={() => setIsShow(true)} />
					<EditButton callback={() => getDashboardOrdersId(item.id)} />
				</div>
			</li>
		</>
	);
}
