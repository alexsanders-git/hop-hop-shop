'use client';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { useCart } from '@/store/cart/Cart.store';

import styles from './styles.module.scss';
import CuponeArrow from '../../../public/cupone.svg';
import DiscountArrow from '../../../public/payment/discountArrow.svg';

export interface InterfacePromoCode {
	open: boolean;
	setOpen: (open: boolean) => void;
	className?: string;
}

export default function PromoCode(props: InterfacePromoCode) {
	const { setOpen, open, className = '' } = props;
	const [value, setValue] = useState<string>('');
	const [data, setData] = useState<{
		message?: string;
		error?: string;
	}>();
	const debouncedValue = useDebounce(value, 700);
	const addCoupon = useCart((state) => state.addCoupon);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const couponData = await addCoupon(debouncedValue);
				if (couponData) {
					setData(couponData.data);
				}
			} catch (error) {
				console.log('error: ', error);
			}
		};

		if (debouncedValue !== '') {
			fetchProduct();
		}
	}, [addCoupon, debouncedValue]);

	return (
		<div className={styles.wrapper}>
			<div className={`${styles.discount} ${className}`}>
				<span>Discount </span>
				<span
					onClick={() => setOpen(!open)}
					className={`${styles.discountWrite} ${!open && styles.rotate}`}
				>
					Enter Code
					<DiscountArrow />
				</span>
			</div>
			{open && (
				<div className={`${styles.discountAccept} ${className}`}>
					<span>
						Enter your magical promo code below and watch as your total goes
						down faster than a cat chasing a laser pointer.
					</span>
					<input
						onChange={(e) => setValue(e.target.value)}
						value={value}
						type={'text'}
						placeholder={'Enter code'}
						className={`${styles.input} ${data?.error && styles.inputError} ${data?.message && styles.inputSuccess}`}
					/>
					<CuponeArrow
						className={`
						${styles.CuponeArrow}
						${data?.error && styles.error}
						${data?.message && styles.success}`}
					/>
				</div>
			)}
		</div>
	);
}
