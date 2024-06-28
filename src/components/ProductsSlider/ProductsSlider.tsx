'use client';

import { useState, useRef } from 'react';
import { Swiper as SwiperClass } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import IconArrow from './left.svg';
import styles from './ProductsSlider.module.scss';
import ProductCardSlider from '../ProductCardSlider/ProductCardSlider';

interface IProductListProps {
	products: IProduct[];
}

export default function ProductsSlider({ products }: IProductListProps) {
	const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
	const swiperRef = useRef<SwiperClass | null>(null);

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

	return (
		<div className={styles.productList}>
			<button
				onClick={handlePrev}
				className={` ${styles.button} ${styles.button_left}`}
			>
				<IconArrow />
			</button>
			<Swiper
				onSwiper={(swiper) => {
					swiperRef.current = swiper;
				}}
				slidesPerView="auto"
				loop={true}
				spaceBetween={20}
				navigation={false}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				className={styles.swiperContainer}
			>
				{products.map(({ id, name, price, images }) => (
					<SwiperSlide key={id} className={styles.swiperSlide}>
						<ProductCardSlider
							id={id}
							name={name}
							price={price}
							images={images}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<button
				onClick={handleNext}
				className={`${styles.button} ${styles.button_right}`}
			>
				<IconArrow className={styles.icon} />
			</button>
		</div>
	);
}
