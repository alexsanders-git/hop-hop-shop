'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Order from '@/app/(frontend)/checkout/components/order/Order';
import Button from '@/components/Button/Button';
import Checkbox from '@/components/checkbox/Checkbox';
import { fetchWithCookies } from '@/services/cookies/cookies.service';
import { useCart } from '@/store/cart/Cart.store';
import { useCheckout } from '@/store/checkout/Checkout.store';
import { IResponseCheckout } from '@/types/response/response';

import styles from './styles.module.scss';

export default function FinishedCheckout() {
	const [open, setOpen] = useState<boolean>(false);
	const creditCard = useCheckout((state) => state.creditCard);
	const deliveryAddress = useCheckout((state) => state.deliveryAddress);
	const personalData = useCheckout((state) => state.personalData);
	const [error, setError] = useState<string>('');
	const fetchCart = useCart((state) => state.fetchCart);
	const navigate = useRouter();

	return (
		<div>
			<div className={styles.order}>
				<Order />
			</div>
			<Checkbox
				classNameCheckbox={styles.checkbox}
				className={styles.WrapCheckbox}
				type={'square'}
				label={'By submitting this form, you acknowledge and accept our '}
				isChecked={open}
				setIsChecked={setOpen}
			>
				<Link style={{ textDecoration: 'underline' }} href={'/terms-of-use'}>
					Terms of use
				</Link>
			</Checkbox>
			<Button
				disabled={!open || !creditCard || !deliveryAddress || !personalData}
				className={styles.placeOrder}
				text={'Place order'}
				onClick={async () => {
					const res = await fetchWithCookies<IResponseCheckout>(
						'/checkout/checkout/',
						{
							method: 'POST',
							body: JSON.stringify({
								first_name: personalData!.name,
								last_name: personalData!.lastname,
								email: personalData!.email,
								phone: personalData!.phone_number,
								shipping_country: deliveryAddress!.shipping_country,
								shipping_city: deliveryAddress!.shipping_city,
								shipping_address: deliveryAddress!.shipping_city,
								shipping_postcode: deliveryAddress!.shipping_postcode,
								card_information: {
									card_number: creditCard!.cardNumber,
									expiry_month: creditCard!.expiryDate.slice(0, 2),
									expiry_year: `20${creditCard!.expiryDate.slice(-2)}`,
									cvc: creditCard!.cvv,
								},
							}),
						},
					);
					if (res.success) {
						fetchCart();
						navigate.push('/thanks-for-order');
					}
					if (!res.success) {
						setError(res.error.message);
					}
				}}
			/>
			{error !== '' && <div className={styles.error}>{error}</div>}
		</div>
	);
}
