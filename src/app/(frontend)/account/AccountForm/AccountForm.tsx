'use client';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import { fetchWithCookies } from '@/services/cookies/cookies.service';
import PhoneInputField from '@/sharedComponenst/phoneInputField/PhoneInputField';
import { useUser } from '@/store/user/User.store';
import { robotoCondensed } from '@/styles/fonts/fonts';
import {
	addressValid,
	cityValid,
	countryValid,
	emailValid,
	latNameValid,
	nameValid,
	passwordValid,
	phoneValid,
	postalCodeValid,
} from '@/validation/checkout/validation';

import styles from './AccountForm.module.scss';

export default function AccountForm() {
	const ref = useRef<FormikProps<IUser>>(null);
	const [initialValues, setInitialValues] = useState<IUser | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const user = useUser((state) => state.user);
	console.log(user);

	// interface FormValues {
	// 	name: string;
	// 	lastname: string;
	// 	email: string;
	// 	phone: string;
	// 	country: string;
	// 	city: string;
	// 	address: string;
	// 	postalCode: string;
	// 	currentPassword: string;
	// 	newPassword: string;
	// 	confirmPassword: string;
	// }

	useEffect(() => {
		if (user) {
			setInitialValues({
				first_name: user.first_name || '',
				last_name: user.last_name || '',
				email: user.email || '',
				phone_number: user.phone_number || '',
				country: user.country || '',
				city: user.city || '',
				address: user.address || '',
				postalCode: user.postalCode || '',
				currentPassword: user.currentPassword || '',
			});
			if (user.avatar) {
				setPreview(user.avatar);
			}
		}
	}, [user]);

	const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFile(event.target.files[0]);

			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		}
	};

	useEffect(() => {
		console.log(preview);
		console.log(selectedFile);
	}, [preview, selectedFile]);

	if (!initialValues) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.imgWrp}>
				<Image
					width={391}
					height={391}
					src={
						preview ||
						(user?.user_role === 'Admin'
							? '/illustration_admin.svg'
							: '/illustration_userPlug.svg')
					}
					alt="User Avatar"
				></Image>
				<input
					type="file"
					id="avatarInput"
					accept="image/*"
					style={{ display: 'none' }}
					onChange={handleAvatarChange}
				/>
				<label htmlFor="avatarInput" className={styles.changeAvatarBtn}>
					Browse your image
				</label>
			</div>
			<Formik
				validationSchema={yup
					.object({
						first_name: nameValid,
						last_name: latNameValid,
						email: emailValid,
						phone_number: phoneValid,
						country: countryValid,
						city: cityValid,
						address: addressValid,
						postalCode: postalCodeValid,
						currentPassword: passwordValid,
						newPassword: passwordValid,
						confirmPassword: yup
							.string()
							.required('Confirm Password is required')
							.oneOf([yup.ref('newPassword')], 'Passwords must match'),
					})
					.required()}
				innerRef={ref}
				initialValues={initialValues}
				onSubmit={async (values: IUser, { resetForm }) => {
					const formData = new FormData();
					formData.append(
						'profile',
						new Blob(
							[
								JSON.stringify({
									first_name: values.first_name,
									last_name: values.last_name,
									email: values.email,
									password: values.newPassword,
									phone_number: values.phone_number,
									country: values.country,
									city: values.city,
									address: values.address,
									postalCode: values.postalCode,
								}),
							],
							{ type: 'application/json' },
						),
					);
					if (selectedFile) {
						formData.append('avatar', selectedFile);
					}

					const res = await fetchWithCookies('/auth/profile/', {
						method: 'PATCH',
						body: formData,
					});

					resetForm();
				}}
			>
				{() => (
					<Form className={styles.formContainer}>
						<div className={styles.formGroup}>
							<h2 className={styles.title}>Personal data</h2>
							<div className={styles.inputContainer}>
								<Input
									className={styles.input}
									title={'First name'}
									type={'text'}
									name={'first_name'}
									placeholder={'John'}
								/>
								<Input
									className={styles.input}
									title={'Last name'}
									type={'text'}
									name={'last_name'}
									placeholder={'Doe'}
								/>
							</div>
							<div
								className={`${styles.inputContainer} ${styles.withPhoneInput}`}
							>
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
										name="phone_number"
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
							<h2 className={styles.title}>Delivery address</h2>
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
							<h2 className={styles.title}>Password</h2>
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
