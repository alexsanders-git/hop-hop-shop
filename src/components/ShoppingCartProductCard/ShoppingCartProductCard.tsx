import Image from 'next/image';
import React from 'react';

import { fetchAddItemToCart } from '@/services/cart/cart.service';
import { InterfaceProductCart } from '@/store/cart/Cart.store';
import { robotoCondensed } from '@/styles/fonts/fonts';

import BasketIcon from './basket.svg';
import MinusIcon from './minus.svg';
import PlusIcon from './plus.svg';
import styles from './ShoppingCartProductCart.module.scss';
import { isArrayOfImages } from '../../../utils/typeGuards';

interface ShoppingCartProductCardProps {
	product: InterfaceProductCart;
	// onIncrease: () => void;
	// onDecrease: () => void;
	// onRemove: () => void;
	quantity: number;
}

export default function ShoppingCartProductCard({
	product,
	// onIncrease,
	// onDecrease,
	// onRemove,
	quantity,
}: ShoppingCartProductCardProps) {
	const imagesArray: IImage[] = isArrayOfImages(product.images)
		? product.images
		: [product.images];
	return (
		<div className={styles.cardWrp}>
			<div className={styles.imgWrp}>
				<Image
					src={''}
					width={130}
					height={130}
					alt={product.name}
					className={styles.product_image}
				/>
			</div>
			<div className={styles.detailsWrp}>
				<div className={styles.details_upperPart}>
					<div>
						<h2 className={styles.productName}>{product.name}</h2>
						<p
							className={`${styles.productDetails} ${robotoCondensed.className}`}
						>
							Size: {product.name}
						</p>
						<p
							className={`${styles.productDetails} ${robotoCondensed.className}`}
						>
							Color: {product.name}
						</p>
					</div>
					<button onClick={() => {}} className={styles.buttonDelete}>
						<BasketIcon />
					</button>
				</div>
				<div className={styles.details_lowerPart}>
					<p className={styles.price}>${product.price}</p>
					<div
						className={`${styles.quantity_controls} ${robotoCondensed.className}`}
					>
						<button onClick={() => {}} className={styles.buttonIncrease}>
							<MinusIcon />
						</button>
						<span>{quantity}</span>
						<button
							onClick={() => {
								fetchAddItemToCart(product.id);
							}}
							className={styles.buttonIncrease}
						>
							<PlusIcon />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
