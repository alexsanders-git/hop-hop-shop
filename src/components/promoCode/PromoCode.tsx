'use client';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { useCart } from '@/store/cart/Cart.store';

import styles from './styles.module.scss';
import DiscountArrow from '../../../public/payment/discountArrow.svg';
import Image from 'next/image';

export interface InterfacePromoCode {
	open: boolean;
	setOpen: (open: boolean) => void;
	className?: string;
	disabled?: boolean;
	coupon: { name: string; discount: number } | null;
}

export default function PromoCode(props: InterfacePromoCode) {
	const { disabled = false, setOpen, open, className = '', coupon } = props;
	const [value, setValue] = useState<string>('');

	const [data, setData] = useState<{
		message?: string;
		error?: string;
	}>();

	const debouncedValue = useDebounce(value, 700);
	const addCoupon = useCart((state) => state.addCoupon);
	const deleteCoupon = useCart((state) => state.deleteCoupon);

	useEffect(() => {
		const fetchProduct = async () => {
			const couponData = await addCoupon(debouncedValue);
			if (couponData === '') {
				setData({ message: 'Success' });
			} else {
				setData({ error: couponData });
			}
		};

		if (debouncedValue !== '' && !coupon) {
			fetchProduct();
		}
	}, [addCoupon, coupon, debouncedValue]);

	const handleDeleteCoupon = async () => {
		if (coupon) {
			await deleteCoupon();
			setValue('');
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={`${styles.discount} ${className}`}>
				<span>Discount </span>
				<span
					onClick={() => setOpen(!open)}
					className={`${styles.discountWrite} ${(coupon || (!disabled && open)) && styles.rotate}`}
				>
					Enter code
					<DiscountArrow />
				</span>
			</div>
			{(coupon || (!disabled && open)) && (
				<>
					<div className={`${styles.discountAccept} ${className}`}>
						<span>
							Enter your magical promo code below and watch as your total goes
							down faster than a cat chasing a laser pointer.
						</span>
						<div className={styles.inputWrapper}>
							<input
								readOnly={!!coupon}
								onChange={(e) => setValue(e.target.value)}
								value={value || coupon?.name}
								type={'text'}
								placeholder={'Enter code'}
								className={`${styles.input} ${data?.error && styles.inputError} ${data?.message && styles.inputSuccess} ${coupon?.discount && styles.inputSuccess}`}
							/>
							{data?.error && (
								<div className={styles.errorMessage}>{data.error}</div>
							)}
							{data?.message === 'success' && (
								<button
									className={styles.deleteCoupon}
									onClick={handleDeleteCoupon}
								>
									<p>Cancel Code</p>
									<Image src="/basket.svg" width={24} height={24} alt={''} />
								</button>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
