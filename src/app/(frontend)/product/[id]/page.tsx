import { notFound } from 'next/navigation';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

import ProductIdActions from '@/components/ProductIdActions/ProductIdActions';
import { fetchDataProductPage } from '@/services/fetchData';
import { robotoCondensed } from '@/styles/fonts/fonts';
import ProductIdDesktopSwiper from '@/template/ProductIdDesktopSwiper/ProductIdDesktopSwiper';
import ProductIdMobileSwiper from '@/template/ProductIdMobileSwiper/ProductIdMobileSwiper';

import styles from './page.module.scss';

type Props = {
	params: {
		id: string;
	};
};

export default async function ProductPage({ params: { id } }: Props) {
	const product = await fetchDataProductPage(id);

	if (!product) {
		notFound();
	}

	return (
		<section className={styles.wrapper}>
			<div className={styles.productPage}>
				<ProductIdMobileSwiper product={product} />
				<ProductIdDesktopSwiper product={product} />
				<div className={styles.productPage__description}>
					<div className={styles.info}>
						<div className={styles.info__wrapper}>
							<div className={styles.info__title}>
								<h1 className={styles.title}>{product?.name}</h1>
								<span
									className={`${styles.subTitle} ${robotoCondensed.className}`}
								>
									{product?.category?.name}
								</span>
							</div>
							<span className={styles.price}>${product?.price}</span>
						</div>
						<p className={`${styles.desc} ${robotoCondensed.className}`}>
							{product?.description}
						</p>
					</div>
					<ProductIdActions product={product} />
				</div>
			</div>
		</section>
	);
}
