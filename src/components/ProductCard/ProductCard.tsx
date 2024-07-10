import Image from 'next/image';
import Link from 'next/link';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './ProductCard.module.scss';
import { isArrayOfImages } from '../../../utils/typeGuards';
import AddToFavouriteButton from '../AddToFavouriteButton/AddToFavouriteButton';

interface IProps {
	product: IProduct;
	showCategory?: boolean;
	showButtons?: {
		favorite?: boolean;
		cart?: boolean;
		checkout?: boolean;
	};
}

export default function ProductCard({
	product,
	showCategory = false,
	showButtons = { favorite: true, cart: false, checkout: false },
}: IProps) {
	const imagesArray: IImage[] = isArrayOfImages(product.images)
		? product.images
		: [product.images];

	return (
		<div className={styles.card}>
			<div className={styles.buttons}>
				{showButtons.favorite && <AddToFavouriteButton product={product} />}
			</div>

			<div className={styles.imageWrapper}>
				<Link href={`/product/${product.id}`}>
					<Image
						src={imagesArray[0].image}
						width={358}
						height={380}
						alt={product.name}
						className={styles.image}
					/>
				</Link>
			</div>

			<div className={styles.content}>
				<div className={styles.details}>
					<h3 className={styles.name}>
						<Link
							href={`/product/${product.id}`}
							className={robotoCondensed.className}
						>
							{product.name}
						</Link>
					</h3>
					<p className={styles.price}>{`$${product.price}`}</p>
				</div>

				{showCategory && (
					<div className={styles.category}>
						<Link
							href={`/category/${product.category.id}`}
							className={robotoCondensed.className}
						>
							{product.category.name}
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}
