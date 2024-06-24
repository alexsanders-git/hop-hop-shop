'use client';
import styles from './styles.module.scss';
import Button from '@/components/Button/Button';
import Checkbox from '@/sharedComponenst/checkbox/Checkbox';
import Order from '@/app/(frontend)/checkout/components/order/Order';

export interface InterfaceFinishedCheckout {}

export default function FinishedCheckout(props: InterfaceFinishedCheckout) {
  const {} = props;
  return (
    <div className={styles.container}>
      <div className={styles.order}>
        <Order />
      </div>
      <Checkbox
        type={'square'}
        className={styles.checkbox}
        label={
          'By submitting this form, you acknowledge\n' +
          'and accept our policy.'
        }
      />
      <Button className={styles.button} text={'Place order'} />
    </div>
  );
}
