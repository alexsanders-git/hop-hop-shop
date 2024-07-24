'use client';
import AddToFavoriteButton from '@/components/AddToFavoriteButton/AddToFavoriteButton';
import Button from '@/components/Button/Button';
import { useCart } from '@/store/cart/Cart.store';

import styles from './styles.module.scss';

interface IProps {
	product: IProduct;
}

export default function ProductIdActions(props: IProps) {
	const { product } = props;
	const addToCart = useCart((state) => state.addItemToCart);

	const addToCartHandler = () => {
		if (product) {
			addToCart(product.id);
		}
	};
	return (
		<div className={styles.actions}>
			<Button
				className={styles.cartButton}
				text={'Add to cart'}
				onClick={addToCartHandler}
			/>

			{product && (
				<AddToFavoriteButton
					className={styles.iconFavorite}
					product={product}
				/>
			)}
		</div>
	);
}
