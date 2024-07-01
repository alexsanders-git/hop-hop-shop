'use client';
import { useState } from 'react';

import PromoCode from '@/components/promoCode/PromoCode';
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';
import { useCart } from '@/store/cart/Cart.store';

import styles from './page.module.scss';

export default function ShoppingCartPage() {
	const cart = useCart((state) => state.cart);
	const totalAmount = cart
		.reduce((total, product) => total + product.quantity * product.price, 0)
		.toFixed(2);

	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className={styles.wrapper}>
			<div className={styles.shoppingCartPage}>
				<div className={styles.shoppingCartWrp}>
					<ShoppingCart />
				</div>
				<div className={styles.orderSummaryWrp}>
					<h2>Order Summary</h2>
					<div className={styles.totalWrp}>
						<div className={styles.pricesWrp}>
							<p>Subtotal </p>
							<p>${totalAmount}</p>
						</div>
						<PromoCode
							className={styles.discount}
							open={open}
							setOpen={setOpen}
						/>
						<div className={`${styles.pricesWrp} ${styles.totalPriceWrp}`}>
							<p>Total</p>
							<p className={styles.totalPrice}>${totalAmount}</p>
						</div>
					</div>
					<button className={styles.buttonCheckout}>Checkout</button>
				</div>
			</div>
		</div>
	);
}
