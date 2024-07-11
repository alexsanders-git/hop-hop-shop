'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Swiper as SwiperClass } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import IconArrow from '@/components/ProductsSlider/left.svg';
import { getImages } from '@/utils/typeGuards';

import styles from './styles.module.scss';

interface IProps {
	product: IProduct;
}

export default function ProductIdDesktopSwiper(props: IProps) {
	const { product } = props;

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
		<div className={styles.swiperWrapper}>
			<div className={styles.swiperContainer}>
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
					{getImages(product?.images).map((img, key) => (
						<SwiperSlide key={key} className={styles.swiperSlide}>
							<Image width={610} height={700} src={img.image} alt="" />
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
				{getImages(product?.images).map((img, key) => (
					<SwiperSlide key={key} className={styles.swiperSlide2}>
						<Image width={220} height={320} src={img.image} alt="" />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
