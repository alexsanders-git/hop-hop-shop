'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Pagination from '@/components/dashboard/pagination/Pagination';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';
import {
	getDashboardCoupons,
	removeCouponById,
} from '@/services/dashboard/coupons/dashboard.coupons.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { formatDate } from '@/utils/func/formatDate';
import { getDashboardCouponsId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

interface IProps {
	coupons: IResponse<ICoupon>;
}

interface IDashboardItem {
	setNewData: (data: IResponse<ICoupon>) => void;
	item: ICoupon;
}

const PageSize = 10;
export default function DashboardTableCoupons(props: IProps) {
	const { coupons } = props;
	const [newData, setNewData] = useState<IResponse<ICoupon>>(coupons);

	const header = [
		{ name: 'Coupon ID' },
		{ name: 'Status' },
		{ name: 'Discount amount ' },
		{ name: 'Valid from' },
		{ name: 'Valid until' },
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
						const coupons = await getDashboardCoupons(page);
						if (coupons.success) {
							setNewData(coupons.data);
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
						const res = await removeCouponById(item.id);
						if (res.success) {
							const coupons = await getDashboardCoupons(1);
							if (coupons.success) {
								setNewData(coupons.data);
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
				<div className={`${styles.col} ${styles.col2}`}>
					{item.active ? 'Active' : 'Inactive'}
				</div>
				<div className={`${styles.col} ${styles.col3}`}>{item.discount}%</div>
				<div className={`${styles.col} ${styles.col4}`}>
					{formatDate(item.valid_from)}
				</div>
				<div className={`${styles.col} ${styles.col5}`}>
					{formatDate(item.valid_to)}
				</div>
				<div className={`${styles.col} ${styles.col6}`}>
					<RemoveButton callback={() => setIsShow(true)} />
					<EditButton callback={() => getDashboardCouponsId(item.id)} />
				</div>
			</li>
		</>
	);
}
