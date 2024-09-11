'use client';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

import useOutside from '@/hooks/useOutside';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';

export interface IProps {
	order: IOrderDetails;
}

const colum = [
	{ name: 'ID' },
	{ name: 'Product Name' },
	{ name: 'Quantity' },
	{ name: 'Price' },
	{ name: 'Total' },
];

const orderItems = [
	{
		id: 1,
		name: 'Product Name',
		quantity: 2,
		price: 120,
		total: 240,
	},
	{
		id: 2,
		name: 'Product Name',
		quantity: 2,
		price: 120,
		total: 240,
	},
	{
		id: 3,
		name: 'Product Name',
		quantity: 2,
		price: 120,
		total: 240,
	},
	{
		id: 4,
		name: 'Product Name',
		quantity: 2,
		price: 120,
		total: 240,
	},
	{
		id: 5,
		name: 'Product Name',
		quantity: 2,
		price: 120,
		total: 240,
	},
];

const status = ['Pending', 'Processing', 'Completed', 'Canceled'];

export default function DashboardOrderDetails(props: IProps) {
	const { order } = props;
	const { ref, isShow, setIsShow } = useOutside(false);
	const [ordersStatus, setOrdersStatus] = useState<string>(status[0]);
	return (
		<div className={styles.wrapper}>
			<h1>Order Details</h1>
			<div className={styles.orderInfo}>
				<p className={styles.order}>
					Order ID:{' '}
					<span className={robotoCondensed.className}>#{order.id}</span>
				</p>
				<p className={styles.order}>
					Date: <span className={robotoCondensed.className}>2024-09-03</span>
				</p>
				<div>
					<div ref={ref} className={styles.selectWrapper}>
						<div className={styles.searchContainer}>
							<div
								onClick={() => setIsShow(!isShow)}
								className={styles.searchInput}
							>
								<span>{ordersStatus}</span>
								<ChevronUp className={`${isShow && styles.rotate}`} />
							</div>
							{isShow && (
								<div className={styles.suggestionsWrapper}>
									<div className={styles.suggestionsWrapperScrollBar}>
										<div className={styles.suggestionsContainer}>
											{status.map((suggestion, index) => (
												<div
													key={index}
													className={styles.suggestionItem}
													onClick={() => {
														setOrdersStatus(suggestion);
														setIsShow(false);
													}}
												>
													{suggestion}
												</div>
											))}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className={styles.userInfo}>
				<div className={styles.userInfo_container}>
					<h4>Personal data</h4>
					<span>
						{order.first_name} {order.last_name}
					</span>
					<span>{order.email}</span>
					<span>{order.phone}</span>
				</div>
				<div className={styles.userInfo_container}>
					<h4>Delivery</h4>
					<span>
						Address: {order.shipping_country}, {order.shipping_city}
					</span>
					<span>
						{order.shipping_address}, {order.shipping_postcode}
					</span>
				</div>
				<div className={styles.userInfo_container}>
					<h4>Payment</h4>
					<span>Credit card, John Doe</span>
					<span>1234 1234 1234 1234</span>
					<span>+38 066 666 66 66</span>
				</div>
			</div>
			<div className={styles.table}>
				<div className={styles.container}>
					<ul className={styles.responsiveTable}>
						<li className={`${styles.tableHeader}`}>
							{colum.map((item, i) => (
								<div
									key={i}
									className={`${styles.col} ${styles[`col${i + 1}`]}`}
								>
									{item.name}
								</div>
							))}
						</li>
						{orderItems.map((item, index) => (
							<li
								key={item.id}
								className={`${styles.tableRow} ${robotoCondensed.className}`}
							>
								<div className={`${styles.col} ${styles.col1}`}>#{item.id}</div>
								<div className={`${styles.col} ${styles.col2}`}>
									{item.name}
								</div>
								<div className={`${styles.col} ${styles.col3}`}>2pcs</div>
								<div className={`${styles.col} ${styles.col4}`}>
									{item.price}
								</div>
								<div className={`${styles.col} ${styles.col5}`}>$240</div>
							</li>
						))}
					</ul>
					<div className={`${styles.orderTotal} ${robotoCondensed.className}`}>
						<div className={styles.orderTotal_wrapper}>
							<div className={styles.orderTotal_item}>
								<span>Subtotal</span>
								<span>$720</span>
							</div>
							<div className={styles.orderTotal_item}>
								<span>Tax (20%)</span>
								<span>$144</span>
							</div>
							<div className={styles.orderTotal_item}>
								<span>Discount</span>
								<span>0%</span>
							</div>
							<div className={styles.orderTotal_item}>
								<span>Shipping Rate</span>
								<span>$20%</span>
							</div>
							<div className={`${styles.orderTotal_item} ${styles.last}`}>
								<span>Total</span>
								<span>$884%</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
