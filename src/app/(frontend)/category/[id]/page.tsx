import { notFound } from 'next/navigation';

import ProductCard from '@/components/ProductCard/ProductCard';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import { getCategoriesById, getProductsByCategory } from '@/services/fetchData';

import styles from './page.module.scss';

type Props = {
	params: {
		id: string;
	};
};

export default async function CategoryPage({ params: { id } }: Props) {
	const category = await getCategoriesById(id);
	const responce = await getProductsByCategory(id);
	const products = responce.items;

	if (!category) {
		notFound();
	}

	return (
		<section className={styles.section}>
			<SectionContainer>
				<h2 className={styles.title}>Category {category?.name}</h2>

				<div className={styles.products}>
					{products.length > 0 ? (
						products.map((product) => (
							<div className={styles.product} key={product.id}>
								<ProductCard product={product} />
							</div>
						))
					) : (
						<h3>Product not found</h3>
					)}
				</div>
			</SectionContainer>
		</section>
	);
}
