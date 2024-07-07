'use client';
import Button from '@/components/Button/Button';
import { useCart } from '@/store/cart/Cart.store';

import styles from './styles.module.scss';

export default function CheckoutHeader() {
	const totalItems = useCart((state) => state.cart?.total_items || 0);
	const totalPrice = useCart((state) => state.cart?.total_price || 0);
	const subtotalPrice = useCart((state) => state.cart?.subtotal_price || 0);

	return (
		<div className={styles.container}>
			<div className={styles.headline}>
				<h1 className={styles.title}>Checkout</h1>
				<span className={styles.total}>
					{totalItems} {totalItems > 1 ? 'items' : 'item'} | $
					{totalPrice < subtotalPrice ? subtotalPrice : totalPrice}
				</span>
			</div>
			<div className={styles.buttonWrapper}>
				<Button className={styles.buttonHead} text={'Log in'} />
			</div>
		</div>
	);
}
