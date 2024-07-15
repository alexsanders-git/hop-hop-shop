'use client';
import { useFormik, useFormikContext } from 'formik';
import Image from 'next/image';
import { useState } from 'react';

import Accordion from '@/app/(frontend)/checkout/components/accordion/Accordion';
import CreditCard from '@/app/(frontend)/checkout/components/creditCard/CreditCard';
import ReadyData from '@/app/(frontend)/checkout/components/readyData/ReadyData';
import Button from '@/components/Button/Button';
import { useCheckout } from '@/store/checkout/Checkout.store';
import { validationSchemaCreditCard } from '@/validation/creditCard/creditCard.validation';

import styles from './styles.module.scss';
import applePay from '../../../../../../public/payment/apple_pay.png';
import bitcoin from '../../../../../../public/payment/bitcoin.png';
import googlePay from '../../../../../../public/payment/google_pay.png';
import paypal from '../../../../../../public/payment/paypal.png';

const deliveryImages = [applePay, googlePay, paypal, bitcoin];

export default function Payment() {
	const [opened, setOpened] = useState(false);
	const [isChecked, setIsChecked] = useState<'card' | 'online'>('card');
	const { payment } = useCheckout((state) => state.checkout);
	const setPayment = useCheckout((state) => state.setPayment);
	const setCreditCard = useCheckout((state) => state.setCreditCard);

	const onSubmit = (values: ICreditCard) => {
		setCreditCard(values);
		setOpened(true);
	};

	const formik = useFormik({
		initialValues: {
			cardNumber: '',
			cvv: '',
			expiryDate: '',
			cardName: '',
		},
		validationSchema: validationSchemaCreditCard,
		onSubmit,
	});

	return (
		<Accordion setActive={setPayment} active={payment} title={'Payment'}>
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
							formik={formik}
							className={isChecked === 'online' ? styles.inactive : ''}
						/>
					</div>
					<Button
						className={styles.button}
						onClick={formik.submitForm}
						disabled={!(formik.isValid && formik.dirty)}
						style={'secondary'}
						text={'Next'}
						type="submit"
					/>
				</div>
			)}
			{opened && (
				<ReadyData
					firstText={formik.values.cardName}
					secondText={formik.values.cardNumber}
					thirdText={formik.values.expiryDate}
					fourText={formik.values.cvv}
					setOpened={() => setOpened(!opened)}
				/>
			)}
		</Accordion>
	);
}
