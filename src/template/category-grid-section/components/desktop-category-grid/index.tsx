import Link from 'next/link';
import Image from 'next/image';

import chunkArray from '@/utils/chunkArray';

import styles from './styles.module.scss';

interface IProps {
	categories: ICategory[];
}

export default function DesktopCategoryGrid({ categories }: IProps) {
	const chunkedCategories = chunkArray(categories, 3);

	return (
		<>
			{chunkedCategories.map((row, rowIndex) => (
				<div key={rowIndex} className={styles.cardsRow}>
					{row.map((category) => (
						<Link
							href={`/category/${category.id}`}
							className={styles.card}
							key={category.id}
						>
							<div className={styles.imageWrapper}>
								<Image
									src={category.image || '/default-image.png'}
									width={335}
									height={560}
									alt={category.name}
								/>
							</div>
							<div className={styles.categoryName}>{category.name}</div>
						</Link>
					))}
				</div>
			))}
		</>
	);
}
