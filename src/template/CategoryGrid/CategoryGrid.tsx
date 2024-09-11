import Image from 'next/image';
import Link from 'next/link';

import SectionContainer from '@/components/SectionContainer/SectionContainer';
import { getCategories } from '@/services/fetchData';

import styles from './CategoryGrid.module.scss';

type CategoryOrPlaceholder = ICategory | IPlaceholder;

export default async function CategoryGrid() {
	// Функція для створення заглушок
	const createPlaceholder = (): IPlaceholder => ({
		empty: true,
	});

	// Отримуємо категорії
	const categoriesResponse = await getCategories();
	if (!categoriesResponse.success) {
		return <div>Error</div>;
	}

	const categories: CategoryOrPlaceholder[] = categoriesResponse.data.items;

	// Перевіряємо, чи кількість елементів кратна 8, якщо ні - додаємо заглушки
	const remainder = categories?.length % 8;
	if (remainder !== 0) {
		const placeholdersNeeded = 8 - remainder;
		for (let i = 0; i < placeholdersNeeded; i++) {
			categories.push(createPlaceholder());
		}
	}

	// Розбиваємо елементи на 4 колонки
	const columns: CategoryOrPlaceholder[][] = [[], [], [], []];

	categories?.forEach((category, index) => {
		columns[index % 4].push(category);
	});

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
				<h2 className={styles.title}>Products category</h2>
			</SectionContainer>

			<div className={styles.cards}>
				{columns?.map((column, columnIndex) => (
					<div className={styles.column} key={columnIndex}>
						{column?.map((item, itemIndex) => {
							if ('empty' in item && item.empty) {
								// Рендеримо заглушку
								return (
									<div key={itemIndex} className={styles.card}>
										<div className={styles.placeholder}>
											<div className={styles.placeholderImageWrapper}>
												<Image
													src="/not-ready.svg"
													width={80}
													height={200}
													alt="placeholder"
												/>
											</div>
											<p className={styles.placeholderTitle}>
												I'm not ready yet!
											</p>
										</div>
									</div>
								);
							} else {
								// Застосування типу
								const category = item as ICategory;

								// Рендеримо категорію
								return (
									<Link
										href={`/category/${category.id}`}
										className={styles.card}
										key={itemIndex}
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
								);
							}
						})}
					</div>
				))}
			</div>
		</section>
	);
}
