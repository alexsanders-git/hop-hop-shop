'use client';
import Link from 'next/link';
import { useState } from 'react';

import Order from '@/app/(frontend)/checkout/components/order/Order';
import Button from '@/components/Button/Button';

import styles from './styles.module.scss';

export interface IFinishedCheckout {}

export default function FinishedCheckout(props: IFinishedCheckout) {
	const [open, setOpen] = useState<boolean>(false);
	// const {} = props;
	return (
		<div>
			<div className={styles.order}>
				<Order />
			</div>
			<div
				onClick={() => {
					setOpen(!open);
				}}
				className={`${styles.wrapper} ${styles.WrapCheckbox}`}
			>
				<div className={`${styles.checkbox} ${styles.square}`}>
					{open && <div className={styles.background}></div>}
				</div>
				<div className={styles.text}>
					By submitting this form, you acknowledge and accept our{' '}
					<Link style={{ textDecoration: 'underline' }} href={'/terms-of-use'}>
						Terms of use
					</Link>
					.
				</div>
			</div>
			<Button disabled={!open} className={styles.button} text={'Place order'} />
		</div>
	);
}
