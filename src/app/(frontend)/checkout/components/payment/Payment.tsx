'use client';
import { useFormik } from 'formik';
import { useState } from 'react';

import Accordion from '@/app/(frontend)/checkout/components/accordion/Accordion';
import ReadyData from '@/app/(frontend)/checkout/components/readyData/ReadyData';
import Button from '@/components/Button/Button';
import { useCheckout } from '@/store/checkout/Checkout.store';
import { validationSchemaCreditCard } from '@/validation/creditCard/creditCard.validation';

import styles from './styles.module.scss';
import CreditCard from '@/app/(frontend)/checkout/components/creditCard/CreditCard';

const paymentImages = [
	{ type: 'card', src: 'card.svg' },
	{ type: 'googlePay', src: 'google_pay.svg' },
	{ type: 'paypal', src: 'paypal.svg' },
	{ type: 'coinbase', src: 'coinbase.svg' },
];

type CreditCardType = 'card' | 'googlePay' | 'coinbase' | 'paypal';

export default function Payment() {
	const [opened, setOpened] = useState(false);
	const { payment } = useCheckout((state) => state.checkout);
	const setPayment = useCheckout((state) => state.setPayment);
	const setCreditCard = useCheckout((state) => state.setCreditCard);
	const [type, setType] = useState<CreditCardType>('card');

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
					<h4 className={styles.title}>Payment methods</h4>
					<div className={styles.imageWrapper}>
						{paymentImages.map((item) => (
							<div key={item.type} className={styles.typeImageWrapper}>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									className={` ${item.type !== type ? styles.inactive : ''}`}
									src={`/payment/${item.src}`}
									alt={`payment type ${item.type}`}
									onClick={() => {
										setType(item.type as CreditCardType);
										if (item.type !== 'card') {
											alert('This payment method is not available yet');
										}
									}}
								/>
							</div>
						))}
					</div>
					{type === 'card' && <CreditCard formik={formik} />}
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
