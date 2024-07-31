import Image from 'next/image';
import React from 'react';

import { InterfaceProductCart } from '@/store/cart/Cart.interface';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { getImages } from '@/utils/typeGuards';

import BasketIcon from './basket.svg';
import MinusIcon from './minus.svg';
import PlusIcon from './plus.svg';
import styles from './ShoppingCartProductCart.module.scss';

interface ShoppingCartProductCardProps {
	product: InterfaceProductCart;
	quantity: number;
	onIncrease: () => void;
	onDecrease: () => void;
	onRemove: () => void;
}

export default function ShoppingCartProductCard(
	props: ShoppingCartProductCardProps,
) {
	const { product, quantity, onIncrease, onDecrease, onRemove } = props;
	return (
		<div className={styles.cardWrp}>
			<div className={styles.imgWrp}>
				<Image
					src={getImages(product.images)[0]?.image || '/default-image.png'}
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
					<button
						onClick={() => {
							onRemove();
						}}
						className={styles.buttonDelete}
					>
						<BasketIcon />
					</button>
				</div>
				<div className={styles.details_lowerPart}>
					<p className={styles.price}>${product.price}</p>
					<div
						className={`${styles.quantity_controls} ${robotoCondensed.className}`}
					>
						<button
							onClick={() => {
								onDecrease();
							}}
							className={styles.buttonIncrease}
						>
							<MinusIcon />
						</button>
						<span>{quantity}</span>
						<button
							onClick={() => {
								onIncrease();
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
