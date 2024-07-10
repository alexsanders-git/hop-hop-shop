'use client';

import LikeIcon from '@/assets/svg/like.svg';
import { useFavorite } from '@/store/favorite/Favorite.store';

import styles from './AddToFavoriteButton.module.scss';

interface IProps {
	product: IProduct;
	className?: string;
}

export default function AddToFavoriteButton({ product, className }: IProps) {
	const { favorites, toggleFavorite } = useFavorite();
	const isFavorite = favorites.some((fav) => fav.id === product.id);

	return (
		<button
			className={`${styles.button} ${className} ${isFavorite ? styles.active : ''}`}
			onClick={() => toggleFavorite(product)}
		>
			<LikeIcon />
		</button>
	);
}
