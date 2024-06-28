'use client';

import { useState } from 'react';

import styles from './AddToFavouriteButton.module.scss';
import LikeIcon from './like.svg';
import LikeOnIcon from './likeOn.svg';

export default function AddToFavouriteButton() {
	const [isFavourite, setIsFavourite] = useState(false);

	const toggleIsFavourite = () => {
		setIsFavourite(!isFavourite);
	};

	return (
		<button
			className={
				!isFavourite
					? `${styles.button}`
					: `${styles.button} ${styles.buttonLikeOn}`
			}
			onClick={toggleIsFavourite}
		>
			{isFavourite ? (
				<LikeOnIcon className={styles.iconOn} />
			) : (
				<LikeIcon className={styles.icon} />
			)}
		</button>
	);
}
