'use client';
import { useState } from 'react';

import EditButton from '@/components/dashboard/editButton/editButton';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Pagination from '@/components/dashboard/pagination/Pagination';
import RemoveButton from '@/components/dashboard/removeButton/RemoveButton';
import {
	getDashboardProducts,
	removeProductById,
} from '@/services/dashboard/products/dashboard.products.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { getDashboardProductsId } from '@/utils/paths/dashboard/dashboard.paths';

import styles from './styles.module.scss';

interface IProps {
	products: IResponse<IProduct>;
}

interface IDashboardItem {
	item: IProduct;
	setNewData: (data: IResponse<IProduct>) => void;
}

const PageSize = 10;
export default function DashboardTableProducts(props: IProps) {
	const { products } = props;
	const [newData, setNewData] = useState<IResponse<IProduct>>(products);

	const header = [
		{ name: 'ID' },
		{ name: 'Product' },
		{ name: 'Category' },
		{ name: 'Price' },
		{ name: 'Actions' },
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
					{newData.items.map((item, index: number) => (
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
						const res = await getDashboardProducts(page);
						setNewData(res);
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
						await removeProductById(item.id).finally(async () => {
							const products = await getDashboardProducts(1);
							setNewData(products);
							setIsShow(false);
						});
					}}
					closeModal={() => setIsShow(false)}
					text={'Are you sure?'}
				/>
			)}
			<li className={`${styles.tableRow} ${robotoCondensed.className}`}>
				<div className={`${styles.col} ${styles.col1}`}>#{item.id}</div>
				<div className={`${styles.col} ${styles.col2}`}>{item.name}</div>
				<div className={`${styles.col} ${styles.col3}`}>
					{item.category.name}
				</div>
				<div className={`${styles.col} ${styles.col4}`}>{item.price}$</div>
				<div className={`${styles.col} ${styles.col5}`}>
					<RemoveButton callback={() => setIsShow(true)} />
					<EditButton callback={() => getDashboardProductsId(item.id)} />
				</div>
			</li>
		</>
	);
}
