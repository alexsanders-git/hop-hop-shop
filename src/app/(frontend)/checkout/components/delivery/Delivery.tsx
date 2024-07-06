'use client';
import { Form, Formik, FormikProps } from 'formik';
import Image from 'next/image';
import { useRef, useState } from 'react';
import * as yup from 'yup';

import Accordion from '@/app/(frontend)/checkout/components/accordion/Accordion';
import ReadyData from '@/app/(frontend)/checkout/components/readyData/ReadyData';
import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { useCheckout } from '@/store/checkout/Checkout.store';
import {
	addressValid,
	cityValid,
	countryValid,
	postalCodeValid,
} from '@/validation/checkout/validation';

import styles from './styles.module.scss';
import dhl from '../../../../../../public/delivery/dhl.png';
import fedEx from '../../../../../../public/delivery/feedEx.png';
import tnt from '../../../../../../public/delivery/tnt.png';
import united from '../../../../../../public/delivery/united.png';
import usp from '../../../../../../public/delivery/usp.png';

export default function Delivery() {
	const [opened, setOpened] = useState(false);
	const ref = useRef<FormikProps<FormValues>>(null);
	const { delivery } = useCheckout((state) => state.checkout);
	const setDelivery = useCheckout((state) => state.setDelivery);
	const setPayment = useCheckout((state) => state.setPayment);

	const deliveryImages = [dhl, fedEx, united, usp, tnt];

	interface FormValues {
		country: string;
		city: string;
		postalCode: string;
		address: string;
	}

	return (
		<Formik
			innerRef={ref}
			validationSchema={yup
				.object({
					country: countryValid,
					city: cityValid,
					address: addressValid,
					postalCode: postalCodeValid,
				})
				.required()}
			initialValues={{
				country: '',
				city: '',
				address: '',
				postalCode: '',
			}}
			onSubmit={async (values) => {
				setPayment(true);
				setOpened(true);
			}}
		>
			{({ isValid, dirty }) => (
				<Form>
					<Accordion
						active={delivery}
						setActive={setDelivery}
						title={'Delivery address'}
					>
						{!opened && (
							<div className={styles.inputWrapper}>
								<div className={styles.deliveryImages}>
									{deliveryImages.map((img, index) => (
										<Image
											className={styles.deliveryImage}
											key={index}
											width={104}
											height={56}
											src={img}
											alt="delivery-image"
										/>
									))}
								</div>
								<div className={styles.inputContainer}>
									<Input
										className={styles.input}
										title={'Country'}
										type={'text'}
										name={'country'}
										placeholder={'country'}
									/>
									<Input
										className={styles.input}
										title={'City'}
										type={'text'}
										name={'city'}
										placeholder={'city'}
									/>
								</div>
								<div className={styles.inputContainer}>
									<Input
										className={styles.input}
										title={'Address'}
										type={'text'}
										name={'address'}
										placeholder={'address'}
									/>
									<Input
										className={styles.input}
										title={'Postal Code'}
										type={'text'}
										name={'postalCode'}
										placeholder={'postal code'}
									/>
								</div>
								<Button
									className={styles.button}
									disabled={!(isValid && dirty)}
									style={'secondary'}
									text={'Next'}
									type="submit"
								/>
							</div>
						)}
						{opened && (
							<ReadyData
								firstText={ref?.current?.values.country}
								secondText={ref?.current?.values.city}
								thirdText={ref?.current?.values.address}
								fourText={ref?.current?.values.postalCode}
								setOpened={() => setOpened(!opened)}
							/>
						)}
					</Accordion>
				</Form>
			)}
		</Formik>
	);
}
