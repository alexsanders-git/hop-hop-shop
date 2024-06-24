import styles from './styles.module.scss';
import CheckoutHeader from '@/app/(frontend)/checkout/components/checkoutHeader/CheckoutHeader';
import PersonalData from '@/app/(frontend)/checkout/components/personalData/PersonalData';
import Delivery from '@/app/(frontend)/checkout/components/delivery/Delivery';
import Payment from '@/app/(frontend)/checkout/components/payment/Payment';
import FinishedCheckout from '@/app/(frontend)/checkout/components/finishedCheckout/FinishedCheckout';
import Order from '@/app/(frontend)/checkout/components/order/Order';

export default function Checkout() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.first}>
        <CheckoutHeader />
        <PersonalData />
        <Delivery />
        <Payment />
        <FinishedCheckout />
      </div>
      <div className={styles.second}>
        <Order />
      </div>
    </section>
  );
}
