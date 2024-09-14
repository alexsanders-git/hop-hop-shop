import Image from 'next/image';
import Link from 'next/link';

import SectionContainer from '@/components/SectionContainer/SectionContainer';

import { getAllCategories } from '@/services/fetchData';

import styles from './styles.module.scss';

export default async function CategoryGrid() {
	const categories = await getAllCategories();

	if (!categories.success) {
		return <div>Error</div>;
	}

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
				<SectionContainer>
					<div className={styles.cardsWrapper}>
						{categories.data.map((category) => (
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
				</SectionContainer>
			</div>
		</section>
	);
}
