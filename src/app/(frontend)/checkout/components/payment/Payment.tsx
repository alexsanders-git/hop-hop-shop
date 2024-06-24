'use client';
import styles from './styles.module.scss';
import { useRef, useState } from 'react';
import { FormikProps } from 'formik';
import Button from '@/components/Button/Button';
import Accordion from '@/app/(frontend)/checkout/components/accordion/Accordion';
import PencilIcon from '../../../../../../public/pencel.svg';
import applePay from '../../../../../../public/payment/apple_pay.png';
import googlePay from '../../../../../../public/payment/google_pay.png';
import paypal from '../../../../../../public/payment/paypal.png';
import bitcoin from '../../../../../../public/payment/bitcoin.png';
import Image from 'next/image';
import Checkbox from '@/sharedComponenst/checkbox/Checkbox';

export interface InterfacePayment {}

export default function Payment(props: InterfacePayment) {
  const {} = props;
  const [opened, setOpened] = useState(false);
  const ref = useRef<FormikProps<FormValues>>(null);

  const deliveryImages = [applePay, googlePay, paypal, bitcoin];

  interface FormValues {
    country: string;
    city: string;
    postalCode: string;
    address: string;
  }

  return (
    <Accordion title={'Payment'}>
      {!opened && (
        <div className={styles.inputWrapper}>
          <div className={styles.choseMethod}>
            <Checkbox label={'Payment methods'} />
            <div className={styles.deliveryImages}>
              {deliveryImages.map((img, index) => (
                <Image
                  className={styles.deliveryImage}
                  key={index}
                  width={90}
                  height={50}
                  src={img}
                  alt="delivery-image"
                />
              ))}
            </div>
          </div>
          <div className={styles.cardMethod}>
            <Checkbox label={'Credit card'} />
          </div>
          <Button
            className={styles.button}
            onClick={() => {}}
            disabled={false}
            style={'secondary'}
            text={'Next'}
            type="submit"
          />
        </div>
      )}
      {opened && (
        <div className={styles.readyData}>
          <div className={styles.userInfo}>
            <span>{ref?.current?.values.country}</span>
            <span>{ref?.current?.values.city}</span>
            <span>{ref?.current?.values.address}</span>
            <span>{ref?.current?.values.postalCode}</span>
          </div>
          <div onClick={() => setOpened(!opened)} className={styles.imgWrapper}>
            <PencilIcon className={styles.img} />
          </div>
        </div>
      )}
    </Accordion>
  );
}
