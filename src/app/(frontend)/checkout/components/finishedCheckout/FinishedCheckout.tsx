'use client';
import { useState } from 'react';

import Order from '@/app/(frontend)/checkout/components/order/Order';
import Button from '@/components/Button/Button';
import Checkbox from '@/sharedComponenst/checkbox/Checkbox';

import styles from './styles.module.scss';

export interface IFinishedCheckout {}

export default function FinishedCheckout(props: IFinishedCheckout) {
	const [open, setOpen] = useState<boolean>(false);
	// const {} = props;
	return (
		<div className={styles.container}>
			<div className={styles.order}>
				<Order />
			</div>
			<Checkbox
				setIsChecked={setOpen}
				isChecked={open}
				type={'square'}
				className={styles.checkbox}
				label={
					'By submitting this form, you acknowledge\n' +
					'and accept our policy.'
				}
			/>
			<Button disabled={!open} className={styles.button} text={'Place order'} />
		</div>
	);
}
