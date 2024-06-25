'use client';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
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
import CreditCard from '@/app/(frontend)/checkout/components/creditCard/CreditCard';
import ReadyData from '@/app/(frontend)/checkout/components/readyData/ReadyData';

export interface InterfacePayment {}

export default function Payment(props: InterfacePayment) {
  const [opened, setOpened] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const deliveryImages = [applePay, googlePay, paypal, bitcoin];
  const [isChecked, setIsChecked] = useState<'card' | 'online'>('card');

  return (
    <Accordion title={'Payment'}>
      {!opened && (
        <div className={styles.inputWrapper}>
          <div className={`${styles.choseMethod}`}>
            <div
              onClick={() => setIsChecked('online')}
              className={`${styles.checkboxWrapper}`}
            >
              <div className={`${styles.checkbox}`}>
                {isChecked === 'online' && (
                  <div className={styles.checkboxBackground}></div>
                )}
              </div>
              <div className={styles.checkboxText}>Payment methods</div>
            </div>
            <div
              className={`${styles.deliveryImages} ${isChecked === 'card' && styles.inactive}`}
            >
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
          <div className={`${styles.cardMethod}`}>
            <div
              onClick={() => setIsChecked('card')}
              className={`${styles.checkboxWrapper}`}
            >
              <div className={`${styles.checkbox}`}>
                {isChecked === 'card' && (
                  <div className={styles.checkboxBackground}></div>
                )}
              </div>
              <div className={styles.checkboxText}>Credit card</div>
            </div>
            <CreditCard
              cardName={cardName}
              cardNumber={cardNumber}
              setCardName={setCardName}
              setCardNumber={setCardNumber}
              cvv={cvv}
              setCvv={setCvv}
              expiryDate={expiryDate}
              setExpiryDate={setExpiryDate}
              className={isChecked === 'online' ? styles.inactive : ''}
            />
          </div>
          <Button
            className={styles.button}
            onClick={() => {
              if (
                cardNumber !== '' &&
                cardName !== '' &&
                expiryDate !== '' &&
                cvv !== ''
              ) {
                setOpened(true);
              }
            }}
            disabled={false}
            style={'secondary'}
            text={'Next'}
            type="submit"
          />
        </div>
      )}
      {opened && (
        <ReadyData
          firstText={cardName}
          secondText={cardNumber}
          thirdText={expiryDate}
          fourText={cvv}
          setOpened={() => setOpened(!opened)}
        />
      )}
    </Accordion>
  );
}
