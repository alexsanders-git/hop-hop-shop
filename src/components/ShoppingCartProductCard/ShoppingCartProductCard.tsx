import Image from 'next/image';
import React from 'react';

import { robotoCondensed } from '@/styles/fonts/fonts';

import BasketIcon from './basket.svg';
import MinusIcon from './minus.svg';
import PlusIcon from './plus.svg';
import styles from './ShoppingCartProductCart.module.scss';

interface ShoppingCartProductCardProps {
	product: IProduct;
	onIncrease: () => void;
	onDecrease: () => void;
	onRemove: () => void;
	quantity: number;
}

export default function ShoppingCartProductCard({
	product,
	onIncrease,
	onDecrease,
	onRemove,
	quantity,
}: ShoppingCartProductCardProps) {
	return (
		<div className={styles.cardWrp}>
			<div className={styles.imgWrp}>
				<Image
					src={product?.images?.image}
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
					<button onClick={() => onRemove()} className={styles.buttonDelete}>
						<BasketIcon />
					</button>
				</div>
				<div className={styles.details_lowerPart}>
					<p className={styles.price}>${product.price}</p>
					<div
						className={`${styles.quantity_controls} ${robotoCondensed.className}`}
					>
						<button
							onClick={() => onDecrease()}
							className={styles.buttonIncrease}
						>
							<MinusIcon />
						</button>
						<span>{quantity}</span>
						<button
							onClick={() => onIncrease()}
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
