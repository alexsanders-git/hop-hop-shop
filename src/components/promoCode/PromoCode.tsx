'use client';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { fetchCoupon } from '@/services/promocode/promocode.service';

import styles from './styles.module.scss';
import DiscountArrow from '../../../public/payment/discountArrow.svg';

export interface InterfacePromoCode {
	open: boolean;
	setOpen: (open: boolean) => void;
	className?: string;
}

export default function PromoCode(props: InterfacePromoCode) {
	const { setOpen, open, className = '' } = props;
	const [value, setValue] = useState<string>('');
	const [data, setData] = useState<any>();
	const debouncedValue = useDebounce(value, 700);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const couponData = await fetchCoupon(debouncedValue);
				if (couponData) {
					setData(couponData);
				}
			} catch (error) {
				console.log('error: ', error);
			}
		};

		if (debouncedValue !== '') {
			fetchProduct();
		}
	}, [debouncedValue]);

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
				</div>
			)}
		</div>
	);
}
