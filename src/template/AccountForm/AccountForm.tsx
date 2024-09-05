'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import { useMutation } from '@/hooks/useMutation';
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

export interface IFormValuesProfile {
	first_name?: string;
	last_name?: string;
	email?: string;
	phone_number?: string;
	country?: string;
	city?: string;
	address?: string;
	postalCode?: string;
	currentPassword?: string;
	newPassword?: string;
	confirmPassword?: string;
}

export default function AccountForm() {
	const user = useUser((state) => state.user);
	const setUser = useUser((state) => state.setUser);
	const { error, mutate, isLoading } = useMutation<IUser>({
		url: 'auth/profile/',
		options: {
			method: 'PATCH',
		},
	});

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(user?.avatar || null);
	const [success, setSuccess] = useState<string>('');

	const handleSubmit = async (values: IFormValuesProfile) => {
		const res = await mutate(values);
		if (res) {
			setUser(res);
			setSuccess('Profile updated successfully');
		}
	};

	const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedFile(file);

			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	if (!user) {
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
						first_name: nameValid.optional(),
						last_name: latNameValid.optional(),
						email: emailValid.optional(),
						phone_number: phoneValid.optional(),
						country: countryValid.optional(),
						city: cityValid.optional(),
						address: addressValid.optional(),
						postalCode: postalCodeValid.optional(),
						currentPassword: passwordValid.optional(),
						newPassword: passwordValid.optional(),
						confirmPassword: yup
							.string()
							.required('Confirm Password is required')
							.oneOf([yup.ref('newPassword')], 'Passwords must match')
							.optional(),
					})
					.required()}
				initialValues={{
					first_name: user?.first_name || '',
					last_name: user?.last_name || '',
					email: user?.email || '',
					phone_number: user?.phone_number || '',
					country: user?.country || '',
					city: user?.city || '',
					address: user?.address || '',
					postalCode: user?.postalCode || '',
					currentPassword: '',
					newPassword: '',
					confirmPassword: '',
				}}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form className={styles.formContainer}>
						{isLoading && <Loader className={styles.loader} />}
						{success !== '' && <MessageSuccess text={success} />}
						{error && <MessageError text={error} />}
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
										htmlFor="phone_number"
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
										name="phone_number"
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
							{user?.user_role !== 'Admin' && (
								<button
									type="button"
									className={styles.deleteButton}
									onClick={() => console.log('Account deleted')}
								>
									Delete account
								</button>
							)}
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
