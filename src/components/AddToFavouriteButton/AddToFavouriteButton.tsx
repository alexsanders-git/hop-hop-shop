'use client';

import { useFavorite } from '@/store/favorite/Favorite.store';

import styles from './AddToFavouriteButton.module.scss';
import LikeIcon from '../../../public/like.svg';

interface IProps {
	product: IProduct;
	className?: string;
}

export default function AddToFavouriteButton({ product, className }: IProps) {
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
