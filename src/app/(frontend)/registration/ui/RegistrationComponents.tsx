'use client';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import Checkbox from '@/sharedComponenst/checkbox/Checkbox';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { emailValid, nameValid } from '@/validation/checkout/validation';

import styles from './styles.module.scss';
import Google from '../../../../../public/login/google.svg';

export default function RegistrationComponents() {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<div className={styles.wrapper}>
			<section className={styles.info}>
				<div className={styles.info_head}>
					<span>Why Create an Account?</span>
					<span>Because Being Awesome</span>
					<span>Has Perks!</span>
				</div>
				<div className={`${styles.info_body} ${robotoCondensed.className}`}>
					<div className={styles.desc}>
						<p>
							<span>Speedy Checkout:</span>
							No more typing in your info every time. Your future self will
							thank you!
						</p>
					</div>
					<div className={styles.desc}>
						<p>
							<span>Order History:</span>
							Track your purchases and remember what you bought when you’re too
							busy being fabulous.
						</p>
					</div>
					<div className={styles.desc}>
						<p>
							<span>Wish List:</span>
							Save your favorite items and drop hints to friends and family.
							Birthdays just got easier.
						</p>
					</div>
					<span className={styles.subDesc}>
						So go ahead, join the cool club. You know you want to!
					</span>
				</div>
			</section>
			<section className={styles.account}>
				<div className={styles.account_wrapper}>
					<h1>Create an account</h1>
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
								password: yup
									.string()
									.required('Password is required')
									.min(8, 'Password is too short - should be 8 chars minimum.'),
								confPassword: yup
									.string()
									.required('Confirm Password is required')
									.oneOf([yup.ref('password')], 'Passwords must match'),
							})
							.required()}
						onSubmit={async (values) => {
							// const res = await fetchWithAuth('/auth/registration/', {
							// 	method: 'POST',
							// 	body: JSON.stringify({
							// 		email: values.email,
							// 		password: values.password,
							// 		first_name: values.name,
							// 		last_name: values.name,
							// 	}),
							// });
							// console.log(res);
						}}
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
									<Button
										style={'secondary'}
										text={'I already have an account'}
									></Button>
									<div className={styles.google}>
										<span className={robotoCondensed.className}>
											Or sing in with
										</span>
										<Google className={styles.googleImage} />
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</section>
		</div>
	);
}
