'use client';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import Checkbox from '@/sharedComponenst/checkbox/Checkbox';
import { robotoCondensed } from '@/styles/fonts/fonts';
import {
	emailValid,
	nameValid,
	passwordValid,
} from '@/validation/checkout/validation';

import styles from './styles.module.scss';
import Google from '../../../public/login/google.svg';

export default function RegistrationForm() {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<Formik
			initialValues={{
				name: '',
				email: '',
				password: '',
				confPassword: '',
			}}
			validationSchema={yup
				.object({
					name: nameValid,
					email: emailValid,
					password: passwordValid,
					confPassword: yup
						.string()
						.required('Confirm Password is required')
						.oneOf([yup.ref('password')], 'Passwords must match'),
				})
				.required()}
			onSubmit={async (values) => {}}
		>
			{({ isValid, dirty }) => (
				<Form className={styles.form}>
					<div className={styles.inputWrapper}>
						<Input
							title={'Name'}
							type={'text'}
							name={'name'}
							placeholder={'Enter Name'}
						/>
						<Input
							title={'Email'}
							type={'email'}
							name={'email'}
							placeholder={'Enter Email'}
						/>
					</div>
					<div className={styles.inputWrapper}>
						<InputPassword
							title={'Password'}
							name={'password'}
							placeholder={'Enter Password'}
						/>{' '}
						<InputPassword
							title={'Confirm password '}
							name={'confPassword'}
							placeholder={'Enter password'}
						/>
					</div>

					<div className={styles.buttonsWrapper}>
						<Checkbox
							className={styles.checkbox}
							type={'square'}
							label={
								'By using our Website, you acknowledge that you have read, understood, and agree to be bound by these'
							}
							isChecked={open}
							setIsChecked={setOpen}
						>
							<Link className={styles.link} href={'/terms-of-use'}>
								Terms of Use.
							</Link>
						</Checkbox>
						<Button
							disabled={!(isValid && dirty && open)}
							type={'submit'}
							style={'primary'}
							text={'Sign up!'}
						></Button>
						<ButtonLink
							href={'/login'}
							style={'secondary'}
							text={'I already have an account'}
							className={styles.buttonLink}
						/>
						<div className={styles.google}>
							<span className={robotoCondensed.className}>Or sing in with</span>
							<Google className={styles.googleImage} />
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}
