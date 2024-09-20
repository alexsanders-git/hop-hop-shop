'use client';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';

import useOutside from '@/hooks/useOutside';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';
import { formatDate } from '@/utils/func/formatDate';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';

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

const status = ['Pending', 'Processing', 'Completed', 'Canceled'];

export default function DashboardOrderDetails(props: IProps) {
	const { order } = props;
	const { ref, isShow, setIsShow } = useOutside(false);
	const [ordersStatus, setOrdersStatus] = useState<string>(status[0]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');
	return (
		<div className={styles.wrapper}>
			{isLoading && <Loader />}
			{error !== '' && <MessageError type={'dashboard'} text={error} />}
			{success !== '' && <MessageSuccess type={'dashboard'} text={success} />}
			<h1>Order Details</h1>
			<div className={styles.orderInfo}>
				<p className={styles.order}>
					Order ID:{' '}
					<span className={robotoCondensed.className}>#{order.id}</span>
				</p>
				<p className={styles.order}>
					Date:{' '}
					<span className={robotoCondensed.className}>
						{formatDate(order.created_at)}
					</span>
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
					<span>Not ready in Back</span>
					{/*<span>Credit card, John Doe</span>*/}
					{/*<span>1234 1234 1234 1234</span>*/}
					{/*<span>+38 066 666 66 66</span>*/}
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
						{order.items.map((item, index) => (
							<li
								key={item.product_id + index}
								className={`${styles.tableRow} ${robotoCondensed.className}`}
							>
								<div className={`${styles.col} ${styles.col1}`}>
									#{item.product_id}
								</div>
								<div className={`${styles.col} ${styles.col2}`}>
									{item.product_name}
								</div>
								<div className={`${styles.col} ${styles.col3}`}>
									{item.quantity}pc
								</div>
								<div className={`${styles.col} ${styles.col4}`}>
									{item.product_price}$
								</div>
								<div className={`${styles.col} ${styles.col5}`}>
									{item.total_price}$
								</div>
							</li>
						))}
					</ul>
					<div className={`${styles.orderTotal} ${robotoCondensed.className}`}>
						<div className={styles.orderTotal_wrapper}>
							<div className={styles.orderTotal_item}>
								<span>Subtotal</span>
								<span>{order.subtotal_price}$</span>
							</div>
							{/*<div className={styles.orderTotal_item}>*/}
							{/*	<span>Tax (20%)</span>*/}
							{/*	<span>$144</span>*/}
							{/*</div>*/}
							{/*<div className={styles.orderTotal_item}>*/}
							{/*	<span>Discount</span>*/}
							{/*	<span>0%</span>*/}
							{/*</div>*/}
							{/*<div className={styles.orderTotal_item}>*/}
							{/*	<span>Shipping Rate</span>*/}
							{/*	<span>$20%</span>*/}
							{/*</div>*/}
							<div className={`${styles.orderTotal_item} ${styles.last}`}>
								<span>Total</span>
								<span>{order.total_price}$</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
