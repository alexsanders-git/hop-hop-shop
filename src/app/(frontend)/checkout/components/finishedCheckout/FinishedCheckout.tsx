'use client';
import Link from 'next/link';
import { useState } from 'react';

import Order from '@/app/(frontend)/checkout/components/order/Order';
import Button from '@/components/Button/Button';
import { fetchWithCookies } from '@/services/cookies/cookies.service';
import Checkbox from '@/sharedComponenst/checkbox/Checkbox';
import { useCart } from '@/store/cart/Cart.store';
import { useCheckout } from '@/store/checkout/Checkout.store';

import styles from './styles.module.scss';

export default function FinishedCheckout() {
	const [open, setOpen] = useState<boolean>(false);
	const creditCard = useCheckout((state) => state.creditCard);
	const deliveryAddress = useCheckout((state) => state.deliveryAddress);
	const personalData = useCheckout((state) => state.personalData);
	const [error, setError] = useState<string>('');
	const fetchCart = useCart((state) => state.fetchCart);
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
				className={styles.button}
				text={'Place order'}
				onClick={async () => {
					const res = await fetchWithCookies('/checkout/checkout/', {
						method: 'POST',
						body: JSON.stringify({
							first_name: personalData!.phone,
							last_name: personalData!.lastname,
							email: personalData!.email,
							phone: personalData!.phone,
							shipping_country: deliveryAddress!.country,
							shipping_city: deliveryAddress!.city,
							shipping_address: deliveryAddress!.address,
							shipping_postcode: deliveryAddress!.postalCode,
							card_information: {
								card_number: creditCard!.cardNumber,
								expiry_month: creditCard!.expiryDate.slice(0, 2),
								expiry_year: `20${creditCard!.expiryDate.slice(-2)}`,
								cvc: creditCard!.cvv,
							},
						}),
					});
					if (res.data) {
						fetchCart();
					}
					if (res.error) {
						setError(res.error);
					}
				}}
			/>
			{error !== '' && <div className={styles.error}>{error}</div>}
		</div>
	);
}
