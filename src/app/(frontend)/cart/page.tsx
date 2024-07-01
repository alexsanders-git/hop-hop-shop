'use client';
import { useEffect, useState } from 'react';

import PromoCode from '@/components/promoCode/PromoCode';
import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';
import { fetchCart } from '@/services/cart/cart.service';
import { useCart } from '@/store/cart/Cart.store';

import styles from './page.module.scss';

export default function ShoppingCartPage() {
	const totalPrice = useCart((state) => state.total_price);
	const setCart = useCart((state) => state.setCart);

	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await fetchCart();
				if (res) {
					setCart(res.data);
				}
			} catch (error) {
				console.log('error: ', error);
			}
		};

		fetchProduct();
	}, []);

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
							<p>${totalPrice}</p>
						</div>
						<PromoCode
							className={styles.discount}
							open={open}
							setOpen={setOpen}
						/>
						<div className={`${styles.pricesWrp} ${styles.totalPriceWrp}`}>
							<p>Total</p>
							<p className={styles.totalPrice}>${totalPrice}</p>
						</div>
					</div>
					<button className={styles.buttonCheckout}>Checkout</button>
				</div>
			</div>
		</div>
	);
}
