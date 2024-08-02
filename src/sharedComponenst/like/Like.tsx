import { Heart } from 'lucide-react';

import { useLike } from '@/store/wishlist/Wishlist.store';

import styles from './styles.module.scss';

export interface ILike {
	className?: string;
	id: number;
}

export default function Like({ id, className = '' }: ILike) {
	const likes = useLike((state) => state.likes);
	const existingProduct = likes.find((p) => p.id === id);
	return (
		<span
			className={`${styles.likeImage} ${className} ${existingProduct && styles.active}`}
		>
			<Heart />
		</span>
	);
}
