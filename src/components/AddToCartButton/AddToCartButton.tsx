'use client';

import CartIcon from '@/assets/svg/cart.svg';
import { useCart } from '@/store/cart/Cart.store';

import styles from './AddToCartButton.module.scss';

interface IProps {
	product: IProduct;
	className?: string;
}

export default function AddToCartButton({ product, className }: IProps) {
	const addToCart = useCart((state) => state.addItemToCart);

	const addToCartHandler = () => {
		if (product) {
			addToCart(product.id);
		}
	};

	return (
		<button
			className={`${styles.button} ${className}`}
			onClick={() => addToCartHandler()}
		>
			<CartIcon />
		</button>
	);
}
