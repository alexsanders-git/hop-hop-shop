'use client';

import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import {
	emailValid,
	latNameValid,
	nameValid,
	phoneValid,
	messageValid,
} from '@/validation/checkout/validation';

import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import PhoneInputField from '@/components/phoneInputField/PhoneInputField';
import Textarea from '@/components/textarea/Textarea';

import styles from './ContactUsForm.module.scss';

export interface IFormValuesProfile {
	first_name?: string;
	last_name?: string;
	email?: string;
	phone_number: string;
	message: string;
}

const handleSubmit = (values: IFormValuesProfile) => {
	console.log('Form Values:', values);
};

export default function ContactUsForm() {
	return (
		<div className={styles.formContainer}>
			<Formik
				validationSchema={yup
					.object({
						first_name: nameValid,
						last_name: latNameValid,
						email: emailValid,
						phone_number: phoneValid,
						message: messageValid,
					})
					.required()}
				initialValues={{
					first_name: '',
					last_name: '',
					email: '',
					phone_number: '',
					message: '',
				}}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form>
						<div className={styles.credentialsWrapper}>
							<div className={styles.inputContainer}>
								<Input
									className={styles.input}
									title={'First Name'}
									type={'text'}
									name={'first_name'}
									placeholder={'Alex'}
								/>
								<Input
									className={styles.input}
									title={'Last Name'}
									type={'text'}
									name={'last_name'}
									placeholder={'Black'}
								/>
							</div>
							<div
								className={`${styles.inputContainer} ${styles.withPhoneInput}`}
							>
								<Input
									className={styles.input}
									title={'E-mail'}
									type={'email'}
									name={'email'}
									placeholder={'exname@mail.com'}
								/>
								<Field
									className={styles.input}
									name={'phone_number'}
									placeholder={'+38 066 666 66 66'}
									title={'Phone Number'}
									component={PhoneInputField<IFormValuesProfile>}
								/>
							</div>
						</div>
						<div className={styles.messageWrapper}>
							<Textarea
								name={'message'}
								placeholder={'Write Your Message'}
								title={'Message'}
								className={styles.messageArea}
								rows={6}
							/>
						</div>
						<Button
							type="submit"
							className={styles.sendMessageButton}
							text="Send Message"
						/>
					</Form>
				)}
			</Formik>
		</div>
	);
}
