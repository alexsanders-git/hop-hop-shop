import Link from 'next/link';
import Image from 'next/image';

import { ProductImage } from '@/types/IProduct';

import PriceTagIcon from './price-tag.svg';

import styles from './ProductCardSlider.module.scss';

interface ProductCardSwiperProps {
  id: number;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
}

export default function ProductCardSlider({
  id,
  name,
  description,
  price,
  images
}: ProductCardSwiperProps) {
  return (
    <div className={styles.card}>
      <Link href={`/product/${id}`}>
        <div className={styles.imgwrapper}>
          <Image
            src={images[0]?.image}
            layout="fill"
            alt="image"
            className={styles.img}
          />
        </div>
        <div className={styles.details}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.pricetag}>
          <PriceTagIcon className={styles.icon} />
          <p className={styles.price}>{`$${price}`}</p>
        </div>
      </Link>
    </div>
  );
}
