'use client';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { useCart } from '@/store/cart/Cart.store';

import styles from './styles.module.scss';
import DiscountArrow from '../../../public/payment/discountArrow.svg';

export interface InterfacePromoCode {
	open: boolean;
	setOpen: (open: boolean) => void;
	className?: string;
	disabled?: boolean;
}

export default function PromoCode(props: InterfacePromoCode) {
	const { disabled = false, setOpen, open, className = '' } = props;
	const [value, setValue] = useState<string>('');

	const [data, setData] = useState<{
		message?: string;
		error?: string;
	}>();

	const debouncedValue = useDebounce(value, 700);
	const addCoupon = useCart((state) => state.addCoupon);

	useEffect(() => {
		const fetchProduct = async () => {
			const couponData = await addCoupon(debouncedValue);
			if (couponData === '') {
				setData({ message: 'Success' });
			} else {
				setData({ error: couponData });
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
					className={`${styles.discountWrite} ${!disabled && !open && styles.rotate}`}
				>
					Enter code
					<DiscountArrow />
				</span>
			</div>
			{!disabled && open && (
				<>
					<div className={`${styles.discountAccept} ${className}`}>
						<span>
							Enter your magical promo code below and watch as your total goes
							down faster than a cat chasing a laser pointer.
						</span>
						<div className={styles.inputWrapper}>
							<input
								onChange={(e) => setValue(e.target.value)}
								value={value}
								type={'text'}
								placeholder={'Enter code'}
								className={`${styles.input} ${data?.error && styles.inputError} ${data?.message && styles.inputSuccess}`}
							/>
							<Check
								className={`
						${styles.CuponeArrow}
						${data?.error && styles.error}
						${data?.message && styles.success}`}
							/>
							{data?.error && (
								<div className={styles.errorMessage}>{data.error}</div>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
