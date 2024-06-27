import Image from 'next/image';

import styles from './ProductCard.module.scss';
import AddToFavouriteButton from '../AddToFavouriteButton/AddToFavouriteButton';
import { ProductImage } from '@/types/IProduct';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
}

export default function ProductCard({
  name,
  description,
  price,
  images
}: ProductCardProps) {
  console.log('images: ', images);
  return (
    <div className={styles.card}>
      <AddToFavouriteButton />
      <div className={styles.imgwrapper}>
        <Image
          src={images[0].image}
          width={357}
          height={378}
          alt="image"
          className={styles.img}
        />
      </div>
      <div className={styles.details}>
        <div className={styles.textwrp}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.price}>{`$${price}`}</p>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
