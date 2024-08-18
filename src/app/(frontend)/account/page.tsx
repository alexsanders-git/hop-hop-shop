'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import AccountForm from './AccountForm/AccountForm';
import OrdersForm from './OrdersForm/OrdersForm';
import styles from './page.module.scss';

type FormType = 'account' | 'orders';

export default function Page() {
	const query = useSearchParams().get('query');
	const [activeForm, setActiveForm] = useState(query || 'account');
	const handleButtonClick = (form: FormType) => {
		setActiveForm(form);
	};

	useEffect(() => {
		setActiveForm(query || 'account');
	}, [query]);

	return (
		<div className={styles.pageWrp}>
			<div className={styles.buttonWrp}>
				<button
					className={`${styles.button}  ${activeForm === 'account' ? styles.active : ''}`}
					onClick={() => handleButtonClick('account')}
				>
					Account
				</button>
				<button
					className={`${styles.button}  ${activeForm === 'orders' ? styles.active : ''}`}
					onClick={() => handleButtonClick('orders')}
				>
					Orders
				</button>
			</div>
			<h1 className={styles.title}>
				{activeForm === 'account' ? 'Account' : 'Orders History'}
			</h1>
			{activeForm === 'account' ? <AccountForm /> : <OrdersForm />}
		</div>
	);
}
