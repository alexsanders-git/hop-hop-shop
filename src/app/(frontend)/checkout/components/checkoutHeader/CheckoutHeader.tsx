'use client';
import styles from './styles.module.scss';
import { useCart } from '@/store/cart/Cart.store';
import Button from '@/components/Button/Button';

export interface ICheckoutHeader {}

export default function CheckoutHeader(props: ICheckoutHeader) {
  const {} = props;
  const cart = useCart((state) => state.cart);
  const totalAmount = cart
    .reduce((total, product) => total + product.quantity * product.price, 0)
    .toFixed(2);
  return (
    <div className={styles.container}>
      <div className={styles.headline}>
        <h1 className={styles.title}>Checkout</h1>
        <span className={styles.total}>
          {cart.length} {cart.length > 1 ? 'items' : 'item'} | ${totalAmount}
        </span>
      </div>
      <div className={styles.buttonWrapper}>
        <Button className={styles.button} text={'Log in'} />
      </div>
    </div>
  );
}
