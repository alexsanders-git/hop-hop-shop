'use client';
import Link from 'next/link';
import { useState } from 'react';

import Order from '@/app/(frontend)/checkout/components/order/Order';
import Button from '@/components/Button/Button';
import Checkbox from '@/sharedComponenst/checkbox/Checkbox';

import styles from './styles.module.scss';

export default function FinishedCheckout() {
	const [open, setOpen] = useState<boolean>(false);
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
			<Button disabled={!open} className={styles.button} text={'Place order'} />
		</div>
	);
}
