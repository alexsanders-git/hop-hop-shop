'use client';

import { useCart } from '@/store/cart/Cart.store';

import styles from './ShoppingCart.module.scss';
import ShoppingCartProductCard from '../ShoppingCartProductCard/ShoppingCartProductCard';

export default function ShoppingCart() {
	// const { cart, addToCart, decreaseQuantityInCart, resetCart } = useCart();
	const { products } = useCart();

	return (
		<div className={styles.shoppingCart}>
			{products.length === 0 ? (
				<p className={styles.titleEmptyCart}>Your cart is empty</p>
			) : (
				products.map((item, index) => (
					<ShoppingCartProductCard
						key={index}
						product={item.product}
						// onIncrease={() => addToCart(product)}
						// onDecrease={() => decreaseQuantityInCart(product.id)}
						// onRemove={() => resetCart(product.id)}
						quantity={item.quantity}
					/>
				))
			)}
		</div>
	);
}
