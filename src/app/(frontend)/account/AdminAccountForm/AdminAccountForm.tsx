'use client';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { useRef } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import PhoneInputField from '@/sharedComponenst/phoneInputField/PhoneInputField';
import { robotoCondensed } from '@/styles/fonts/fonts';
import {
	nameValid,
	latNameValid,
	emailValid,
	phoneValid,
	addressValid,
	cityValid,
	countryValid,
	postalCodeValid,
	passwordValid,
	confirmPasswordValid,
} from '@/validation/checkout/validation';

import styles from './AdminAccountForm.module.scss';

export default function AdminAccountForm() {
	const ref = useRef<FormikProps<FormValues>>(null);

	interface FormValues {
		name: string;
		lastname: string;
		email: string;
		phone: string;
		country: string;
		city: string;
		address: string;
		postalCode: string;
		currentPassword: string;
		newPassword: string;
		confirmPassword: string;
	}

	const handleSubmit = (values: FormValues) => {
		console.log(values);
	};

	return (
		<div className={styles.container}>
			<Formik
				validationSchema={yup
					.object({
						name: nameValid,
						lastname: latNameValid,
						email: emailValid,
						phone: phoneValid,
						country: countryValid,
						city: cityValid,
						address: addressValid,
						postalCode: postalCodeValid,
						currentPassword: passwordValid,
						newPassword: passwordValid,
						confirmPassword: confirmPasswordValid,
					})
					.required()}
				innerRef={ref}
				initialValues={{
					name: '',
					lastname: '',
					email: '',
					phone: '',
					country: '',
					city: '',
					address: '',
					postalCode: '',
					currentPassword: '',
					newPassword: '',
					confirmPassword: '',
				}}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form>
						<div className={styles.formGroup}>
							<h2 className={`${styles.title} ${robotoCondensed.className}`}>
								Personal data
							</h2>
							<div className={styles.inputContainer}>
								<Input
									className={styles.input}
									title={'First name'}
									type={'text'}
									name={'name'}
									placeholder={'John'}
								/>
								<Input
									className={styles.input}
									title={'Last name'}
									type={'text'}
									name={'lastname'}
									placeholder={'Doe'}
								/>
							</div>
							<div className={styles.inputContainer}>
								<Input
									className={styles.input}
									title={'Email'}
									type={'email'}
									name={'email'}
									placeholder={'exname@mail.com'}
								/>
								<div className={styles.phoneInputContainer}>
									<label
										className={`${styles.phoneInputText} ${robotoCondensed.className}`}
										htmlFor="phone"
									>
										Phone Number
									</label>
									<Field
										name="phone"
										placeholder={'+38 066 666 66 66'}
										component={PhoneInputField}
									/>
									<ErrorMessage
										className={styles.error}
										name="phone"
										component="div"
									/>
								</div>
							</div>
						</div>
						<div className={styles.formGroup}>
							<h2 className={`${styles.title} ${robotoCondensed.className}`}>
								Delivery address
							</h2>
							<div className={styles.inputContainer}>
								<Input
									className={styles.input}
									title={'Country'}
									type={'text'}
									name={'country'}
									placeholder={'France'}
								/>
								<Input
									className={styles.input}
									title={'City'}
									type={'text'}
									name={'city'}
									placeholder={'Marsel'}
								/>
							</div>
							<div className={styles.inputContainer}>
								<Input
									className={styles.input}
									title={'Address'}
									type={'text'}
									name={'address'}
									placeholder={'Some str 6, 8'}
								/>
								<Input
									className={styles.input}
									title={'Postal Code'}
									type={'text'}
									name={'postalCode'}
									placeholder={'03039'}
								/>
							</div>
						</div>
						<div className={styles.formGroup}>
							<h2 className={`${styles.title} ${robotoCondensed.className}`}>
								Password
							</h2>
							<InputPassword
								className={styles.input}
								title={'Current password'}
								name={'currentPassword'}
								placeholder={'Current password'}
							/>
							<div className={styles.inputContainer}>
								<InputPassword
									className={styles.input}
									title={'New password'}
									name={'newPassword'}
									placeholder={'New password'}
								/>
								<InputPassword
									className={styles.input}
									title={'Confirm password'}
									name={'confirmPassword'}
									placeholder={'Confirm password'}
								/>
							</div>
						</div>
						<div className={styles.actions}>
							<button
								type="button"
								className={styles.deleteButton}
								onClick={() => console.log('Account deleted')}
							>
								Delete account
							</button>
							<Button
								type="submit"
								className={styles.saveButton}
								text="Save changes"
							/>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
