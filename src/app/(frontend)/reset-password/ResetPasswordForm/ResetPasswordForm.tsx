'use client';

import { Form, Formik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import InputPassword from '@/components/Input/Input';
import { passwordValid } from '@/validation/checkout/validation';

import styles from './ResetPasswordForm.module.scss';
import { Modal } from '../ResetPasswordSuccessModal/ResetPasswordSuccessModal';

export interface IFormValuesProfile {
	newPassword?: string;
	confirmPassword?: string;
}

export default function ResetPasswordForm() {
	const [showModal, setShowModal] = useState(false);

	const handleSubmit = (values: IFormValuesProfile) => {
		console.log(values);
		setShowModal(true);
	};

	return (
		<>
			<Formik
				validationSchema={yup
					.object({
						newPassword: passwordValid,
						confirmPassword: yup
							.string()
							.required('Confirm Password is required')
							.oneOf([yup.ref('newPassword')], 'Passwords must match'),
					})
					.required()}
				initialValues={{
					newPassword: '',
					confirmPassword: '',
				}}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form className={styles.form}>
						<InputPassword
							type={'password'}
							title={'New password'}
							name={'newPassword'}
							placeholder={'New password'}
						/>
						<InputPassword
							type={'password'}
							title={'Confirm password'}
							name={'confirmPassword'}
							placeholder={'Confirm password'}
						/>
						<Button
							type="submit"
							className={styles.resetButton}
							text="Reset my password"
							style="primary"
						/>
					</Form>
				)}
			</Formik>
			<Modal show={showModal} onClose={() => setShowModal(false)} />
		</>
	);
}
