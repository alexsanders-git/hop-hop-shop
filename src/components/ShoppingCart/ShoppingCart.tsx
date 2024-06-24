'use client';

import { useCart } from '@/store/cart/Cart.store';

import styles from './ShoppingCart.module.scss';
import ShoppingCartProductCard from '../ShoppingCartProductCard/ShoppingCartProductCard';

export default function ShoppingCart() {
  const { cart, addToCart, decreaseQuantityInCart, resetCart } = useCart();

  return (
    <div className={styles.shoppingCart}>
      {cart.length === 0 ? (
        <p className={styles.titleEmptyCart}>Your cart is empty</p>
      ) : (
        cart.map((product) => (
          <ShoppingCartProductCard
            key={product.id}
            product={product}
            onIncrease={() => addToCart(product)}
            onDecrease={() => decreaseQuantityInCart(product.id)}
            onRemove={() => resetCart(product.id)}
            quantity={product.quantity}
          />
        ))
      )}
    </div>
  );
}
