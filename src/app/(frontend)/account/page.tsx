'use client';
import { useState } from 'react';

import SearchBar from '@/components/SearchBar/SearchBar';
import { useFormStore } from '@/store/useForm/useForm.store';

import AccountForm from './AccountForm/AccountForm';
import OrdersForm from './OrdersForm/OrdersForm';
import styles from './page.module.scss';
import Logout from '../../../assets/svg/logaut.svg';

export default function Page() {
	const activeForm = useFormStore((state) => state.activeForm);
	const setActiveForm = useFormStore((state) => state.setActiveForm);

	return (
		<div className={styles.pageWrp}>
			<div className={styles.upperButtonsWrp}>
				<div className={styles.buttonWrp}>
					<button
						className={`${styles.button}  ${activeForm === 'account' ? styles.active : ''}`}
						onClick={() => setActiveForm('account')}
					>
						Account
					</button>
					<button
						className={`${styles.button}  ${activeForm === 'orders' ? styles.active : ''}`}
						onClick={() => setActiveForm('orders')}
					>
						Orders
					</button>
				</div>
				<div className={styles.logOutBtn}>
					<Logout />
				</div>
			</div>
			<div className={styles.titleWrp}>
				<h1 className={styles.title}>
					{activeForm === 'account' ? 'Account' : 'Orders History'}
				</h1>
				{activeForm === 'orders' && <SearchBar />}
			</div>
			{activeForm === 'account' ? <AccountForm /> : <OrdersForm />}
		</div>
	);
}
