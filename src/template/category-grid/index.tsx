import Image from 'next/image';
import Link from 'next/link';

import SectionContainer from '@/components/SectionContainer/SectionContainer';

import { getCategories } from '@/services/fetchData';

import styles from './styles.module.scss';

function chunkArray<T>(array: T[], size: number): T[][] {
	const chunkedArray: T[][] = [];
	for (let i = 0; i < array.length; i += size) {
		chunkedArray.push(array.slice(i, i + size));
	}
	return chunkedArray;
}

export default async function CategoryGrid() {
	// Отримуємо категорії
	const categoriesResponse = await getCategories();

	if (!categoriesResponse.success && categoriesResponse.data.items.length > 0) {
		return <div>Error</div>;
	}

	const categories = categoriesResponse.data.items;

	const chunkedCategories = chunkArray(categories, 3);

	return (
		<section id="category">
			<div className={styles.ribbonWrapper}>
				<Image
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					src={'/ribbonProductsCategory.svg'}
					alt="img"
					className={styles.ribbon}
				/>
			</div>

			<SectionContainer>
				<h2 className={styles.title}>Categories</h2>
			</SectionContainer>

			<div className={styles.cards}>
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
			</div>
		</section>
	);
}
