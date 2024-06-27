import React from 'react';

import Image from 'next/image';

import BasketIcon from './basket.svg';
import MinusIcon from './minus.svg';
import PlusIcon from './plus.svg';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './ShoppingCartProductCart.module.scss';

interface ShoppingCartProductCardProps {
  product: IProduct;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  quantity: number;
}

export default function ShoppingCartProductCard({
  product,
  onIncrease,
  onDecrease,
  onRemove,
  quantity
}: ShoppingCartProductCardProps) {
  return (
    <div className={styles.cardWrp}>
      <div className={styles.imgWrp}>
        <Image
          src={product?.images?.image}
          width={130}
          height={130}
          alt={product.name}
          className={styles.product_image}
        />
      </div>
      <div className={styles.detailsWrp}>
        <div className={styles.details_upperPart}>
          <div>
            <h2
              className={`${styles.productName} ${robotoCondensed.className}`}
            >
              {product.name}
            </h2>
            <p className={styles.productDetails}>Size: {product.name}</p>
            <p className={styles.productDetails}>Color: {product.name}</p>
          </div>
          <button onClick={() => onRemove()} className={styles.buttonDelete}>
            <BasketIcon />
          </button>
        </div>
        <div className={styles.details_lowerPart}>
          <p className={`${styles.price} ${robotoCondensed.className}`}>
            ${product.price}
          </p>
          <div className={styles.quantity_controls}>
            <button
              onClick={() => onDecrease()}
              className={styles.buttonIncrease}
            >
              <MinusIcon />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => onIncrease()}
              className={styles.buttonIncrease}
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
