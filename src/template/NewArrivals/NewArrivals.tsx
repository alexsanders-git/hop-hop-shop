import Image from 'next/image';

import ProductsSlider from '@/components/ProductsSlider/ProductsSlider';
import SectionContainer from '@/components/SectionContainer/SectionContainer';
import { getLatestArrivalProducts } from '@/services/fetchData';

import styles from './NewArrivals.module.scss';

export default async function NewArrivals() {
	const products = await getLatestArrivalProducts();

	console.log(products);

	return (
		<section className={styles.section}>
			<div className={styles.ribbonWrapper}>
				<Image
					layout="fill"
					objectFit="cover"
					objectPosition="center"
					src={'/ribbonArrivals.svg'}
					alt="img"
					className={styles.ribbon}
				/>
			</div>

			<SectionContainer>
				<h2 className={styles.title}>New Arrivals</h2>

				{products.items.length > 0 && (
					<ProductsSlider products={products.items} />
				)}
			</SectionContainer>
		</section>
	);
}
