'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import { Swiper as SwiperClass } from 'swiper';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '@/components/Button/Button';
import IconArrow from '@/components/ProductsSlider/left.svg';
import { fetchDataProductPage } from '@/services/fetchData';
import CircleBackground from '@/sharedComponenst/circleBackground/CircleBackground';
import Like from '@/sharedComponenst/like/Like';
import Loading from '@/sharedComponenst/loading/Loading';
import { useCart } from '@/store/cart/Cart.store';
import { useLike } from '@/store/wishlist/Wishlist.store';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './page.module.scss';

export default function ProductPage() {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<IProduct | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const toggleLike = useLike((state) => state.toggleLike);
	const addToCart = useCart((state) => state.addToCart);
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
	const swiperRef = useRef<SwiperClass | null>(null);

	const wishListHandler = () => {
		if (product) {
			// toggleLike(product);
			console.log('toggleLike:', product);
		}
	};
	const addToCartHandler = () => {
		if (product) {
			// addToCart(product);
			console.log('addToCart:', product);
		}
	};
	const handlePrev = () => {
		if (swiperRef.current) {
			swiperRef.current.slidePrev();
		}
	};

	const handleNext = () => {
		if (swiperRef.current) {
			swiperRef.current.slideNext();
		}
	};

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const productData = await fetchDataProductPage(id);
				if (productData) {
					setProduct(productData);
				} else {
					setError('Product not found');
				}
			} catch (error) {
				setError('Failed to fetch product data');
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<section className={styles.wrapper}>
			<div className={styles.productPage}>
				<div className={styles.productPage__secondSwiper}>
					<Swiper
						pagination={{
							clickable: true,
							bulletActiveClass: `${styles.swiperPaginationBulletActive}`,
							bulletClass: `${styles.swiperPaginationBullet}`,
							horizontalClass: `${styles.horizontalClass}`,
						}}
						modules={[Pagination]}
						className={styles.mobileSwiper}
					>
						<CircleBackground onclick={wishListHandler}>
							<Like id={product!.id} />
						</CircleBackground>
						{product?.images.map((img, key) => (
							<SwiperSlide key={key} className={styles.slideMobile}>
								<img src={img.image} alt="" />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div className={styles.productPage__swiper}>
					<div className={styles.productPage__swiperWrapper}>
						<button
							onClick={handleNext}
							className={`${styles.button} ${styles.button_right}`}
						>
							<IconArrow className={styles.icon} />
						</button>
						<Swiper
							onSwiper={(swiper) => {
								swiperRef.current = swiper;
							}}
							loop={true}
							spaceBetween={10}
							navigation={false}
							thumbs={{ swiper: thumbsSwiper }}
							modules={[FreeMode, Navigation, Thumbs]}
							className={styles.mySwiper2}
						>
							{product?.images.map((img, key) => (
								<SwiperSlide key={key} className={styles.swiperSlide}>
									<img src={img.image} alt="" />
								</SwiperSlide>
							))}
						</Swiper>
						<button
							onClick={handlePrev}
							className={` ${styles.button} ${styles.button_left}`}
						>
							<IconArrow />
						</button>
					</div>
					<Swiper
						onSwiper={setThumbsSwiper}
						loop={true}
						spaceBetween={20}
						slidesPerView={2.15}
						freeMode={true}
						watchSlidesProgress={true}
						modules={[FreeMode, Navigation, Thumbs]}
						className={styles.mySwiper}
						direction={'vertical'}
					>
						{product?.images.map((img, key) => (
							<SwiperSlide key={key} className={styles.swiperSlide2}>
								<img src={img.image} alt="" />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
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
					<div className={styles.actions}>
						<Button
							className={styles.cartButton}
							text={'Add To cart'}
							onClick={addToCartHandler}
						/>
						<CircleBackground
							className={styles.actions__iconWrapper}
							onclick={wishListHandler}
						>
							<Like id={product!.id} />
						</CircleBackground>
					</div>
				</div>
			</div>
		</section>
	);
}
