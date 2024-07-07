import ShoppingCart from '@/components/ShoppingCart/ShoppingCart';

import styles from './page.module.scss';

export default function CartPage() {
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
							<p>Subtotal</p>
							<p>$Price</p>
						</div>
						<div className={styles.pricesWrp}>
							<p>Discount</p>
							<p>Enter code</p>
						</div>
						<div className={`${styles.pricesWrp} ${styles.totalPriceWrp}`}>
							<p>Total</p>
							<p className={styles.totalPrice}>$Price</p>
						</div>
					</div>
					<button className={styles.buttonCheckout}>Checkout</button>
				</div>
			</div>
		</div>
	);
}
