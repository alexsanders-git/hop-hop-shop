import Image from 'next/image';
import Link from 'next/link';

import SectionContainer from '@/components/SectionContainer/SectionContainer';

import { getCategories } from '@/services/fetchData';

import styles from './styles.module.scss';
import CategoryGrid from './components/category-grid';

export default async function CategoryGridSection() {
	const categoriesResponse = await getCategories();

	if (!categoriesResponse.success && categoriesResponse.data.items.length > 0) {
		return <div>Error</div>;
	}

	const categories = categoriesResponse.data.items;

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
				<h2 className={styles.title}>Product Categories</h2>
			</SectionContainer>

			<div className={styles.cards}>
				<CategoryGrid categories={categories} />
			</div>
		</section>
	);
}
