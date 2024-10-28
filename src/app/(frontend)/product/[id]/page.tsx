import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

import AddToFavoriteButton from '@/components/AddToFavoriteButton/AddToFavoriteButton';
import ProductIdActions from '@/components/ProductIdActions/ProductIdActions';
import {
	fetchData,
	getCategoriesById,
	getProductById,
} from '@/services/fetchData';
import { robotoCondensed } from '@/styles/fonts/fonts';
import ProductIdDesktopSwiper from '@/template/ProductIdDesktopSwiper/ProductIdDesktopSwiper';
import ProductIdMobileSwiper from '@/template/ProductIdMobileSwiper/ProductIdMobileSwiper';
import { getImages } from '@/utils/typeGuards';

import styles from './page.module.scss';
import type { Metadata } from 'next';

type Props = {
	params: {
		id: string;
	};
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const product = await getProductById(params.id);

	if (!product.success) {
		return notFound();
	}

	return {
		title: `${product.data.name} - HopHopShop`,
	};
}

export default async function ProductPage({ params: { id } }: Props) {
	const product = await getProductById(id);

	if (!product.success) {
		return notFound();
	}

	const imagesArr = getImages(product.data.images);

	return (
		<section className={styles.wrapper}>
			<div className={styles.productPage}>
				{imagesArr.length > 1 ? (
					<>
						<ProductIdMobileSwiper product={product.data} />
						<ProductIdDesktopSwiper product={product.data} />
					</>
				) : (
					<div className={styles.defaultImageWrapper}>
						<div className={styles.mobileActions}>
							<AddToFavoriteButton product={product.data} />
						</div>
						<Image
							src={imagesArr[0]?.image || '/default-image.png'}
							width={500}
							height={500}
							alt={product.data.name}
							className={styles.img}
						/>
					</div>
				)}
				<div className={styles.productPage__description}>
					<div className={styles.info}>
						<div className={styles.info__wrapper}>
							<div className={styles.info__title}>
								<h1 className={styles.title}>{product?.data.name}</h1>
								{product?.data?.category && (
									<Link
										href={`/category/${product?.data.category?.id}`}
										className={`${styles.subTitle} ${styles.subTitleLink} ${robotoCondensed.className}`}
									>
										{product?.data.category?.name}
									</Link>
								)}
							</div>
							<span className={styles.price}>${product?.data.price}</span>
						</div>
						<p className={`${styles.desc} ${robotoCondensed.className}`}>
							{product?.data.description}
						</p>
					</div>
					<ProductIdActions product={product.data} />
				</div>
			</div>
		</section>
	);
}
