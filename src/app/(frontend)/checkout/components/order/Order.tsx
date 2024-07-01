'use client';
import { useState } from 'react';

import Button from '@/components/Button/Button';
import PromoCode from '@/components/promoCode/PromoCode';
import { useCart } from '@/store/cart/Cart.store';
import { londrinaSolid, robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';

export default function Order() {
	const cart = useCart((state) => state.cart);
	const [open, setOpen] = useState<boolean>(false);

	const totalAmount = cart
		.reduce((total, product) => total + product.quantity * product.price, 0)
		.toFixed(2);

	return (
		<div className={styles.wrapper}>
			<div className={styles.buttonWrapper}>
				<Button className={styles.buttonOrange} text={'Log in'} />
			</div>
			<div className={styles.container}>
				<h1 className={styles.title}>Your Order</h1>
				<div className={styles.productMap}>
					{cart.map((product, key) => (
						<div
							key={key}
							className={`${styles.productWrapper} ${robotoCondensed.className}`}
						>
							<span className={styles.name}>{product.name}</span>
							<div className={styles.productContainer}>
								<span className={styles.price}>${product.price}</span>
								<span className={styles.qty}>Quantity: {product.quantity}</span>
							</div>
						</div>
					))}
				</div>
			</div>
			<div
				className={`${styles.productPaymentInfo}
         ${robotoCondensed.className}`}
			>
				<div className={styles.Subtotal}>
					<span>Subtotal</span>
					<span>${totalAmount}</span>
				</div>
				<div className={styles.delivery}>
					<span>Delivery Fee</span>
					<span>$15</span>
				</div>
				<PromoCode open={open} setOpen={setOpen} />
				<div className={styles.total}>
					<span>Total</span>
					<span className={londrinaSolid.className}>$15</span>
				</div>
			</div>
		</div>
	);
}
