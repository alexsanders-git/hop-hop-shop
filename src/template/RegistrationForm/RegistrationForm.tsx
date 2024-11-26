'use client';
import { Field, Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import Checkbox from '@/components/checkbox/Checkbox';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import PhoneInputField from '@/components/phoneInputField/PhoneInputField';
import { fetchWithCookies } from '@/services/cookies/cookies.service';
import { useUser } from '@/store/user/User.store';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { IResponseAuth } from '@/types/response/response';
import { CookiesEnums } from '@/utils/enums/cookiesEnums';
import {
	emailValid,
	latNameValid,
	nameValid,
	passwordValid,
	phoneValid,
} from '@/validation/checkout/validation';

import styles from './styles.module.scss';
import Google from '../../../public/login/google.svg';
import useOutside from '@/hooks/useOutside';
import ActionModal from '@/components/ActionModal/ActionModal';

export default function RegistrationForm() {
	const [open, setOpen] = useState<boolean>(false);
	const setUser = useUser((state) => state.setUser);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const {
		ref: successModalRef,
		isShow: isSuccessModalOpen,
		setIsShow: setIsSuccessModalOpen,
	} = useOutside(false);

	const [isResendAvailable, setIsResendAvailable] = useState(false);
	const [timer, setTimer] = useState(59);

	useEffect(() => {
		let countdown: NodeJS.Timeout | null = null;
		if (isSuccessModalOpen && !isResendAvailable) {
			setTimer(59);
			countdown = setInterval(() => {
				setTimer((prev) => {
					if (prev <= 1) {
						clearInterval(countdown!);
						setIsResendAvailable(true);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		}
		return () => {
			if (countdown) clearInterval(countdown);
		};
	}, [isSuccessModalOpen, isResendAvailable]);
	const handleResend = () => {
		setIsResendAvailable(false);
		console.log('resend email logic here');
		// resend email logic here
	};

	const handleEmailChange = (email: string) => {
		setEmail(email);
	};

	return (
		<>
			{isSuccessModalOpen && (
				<ActionModal
					ref={successModalRef}
					show={isSuccessModalOpen}
					iconSrc={'/verifyMail.svg'}
					title="Just One More Thing..."
					text={
						<span>
							We sent a super-secret link to{' '}
							<a
								href={`https://${email.split('@')[1].toLowerCase()}`}
								target="_blank"
								style={{ color: '#000', fontWeight: 'bold' }}
							>
								{email}
							</a>{' '}
							to verify your email. Check it, click it, and join the cool club!
						</span>
					}
					type={'success'}
					onClose={() => setIsSuccessModalOpen(false)}
				>
					<div>
						{!isResendAvailable ? (
							<p className={styles.recendTimer}>
								Resend email in 00:<b>{timer}</b>
							</p>
						) : (
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<button
									className={styles.recendTimer}
									onClick={handleResend}
									style={{ cursor: 'pointer' }}
								>
									Resend email
								</button>
							</div>
						)}
					</div>
				</ActionModal>
			)}
			<Formik
				initialValues={{
					name: '',
					last_name: '',
					email: '',
					phone_number: '',
					password: '',
					confPassword: '',
				}}
				validationSchema={yup
					.object({
						name: nameValid,
						last_name: latNameValid,
						phone_number: phoneValid,
						email: emailValid,
						password: passwordValid,
						confPassword: yup
							.string()
							.required('Confirm Password is required')
							.oneOf([yup.ref('password')], 'Passwords must match'),
					})
					.required()}
				onSubmit={async (values) => {
					setIsLoading(true);
					const res = await fetchWithCookies<IResponseAuth>(
						'/auth/registration/',
						{
							method: 'POST',
							body: JSON.stringify({
								first_name: values.name,
								last_name: values.last_name,
								email: values.email,
								password: values.password,
								phone_number: values.phone_number,
							}),
						},
					);
					if (res.success) {
						setIsLoading(false);
						Cookies.set(
							CookiesEnums.access_token,
							res.data.access_token.value,
							{
								expires: res.data.access_token.expires,
							},
						);
						Cookies.set(
							CookiesEnums.refresh_token,
							res.data.refresh_token.value,
							{
								expires: res.data.refresh_token.expires,
								secure: true,
								sameSite: 'None',
								path: '/',
							},
						);
						setUser(res.data.user);
						setIsSuccessModalOpen(true);
					} else if (!res.success) {
						setIsLoading(false);
						setError(res.error.message);
						setTimeout(() => {
							setError('');
						}, 10000);
					}
				}}
			>
				{({ isValid, dirty, setFieldValue }) => (
					<Form className={styles.form}>
						{isLoading && <Loader className={styles.loader} />}
						{error !== '' && <MessageError text={error} />}
						<div className={styles.inputWrapper}>
							<Input
								title={'First Name'}
								type={'text'}
								name={'name'}
								placeholder={'Enter Name'}
							/>
							<Input
								title={'Last Name'}
								type={'text'}
								name={'last_name'}
								placeholder={'Enter Last Name'}
							/>
						</div>
						<div className={styles.inputWrapper}>
							<Input
								title={'Email'}
								type={'email'}
								name={'email'}
								placeholder={'Enter Email'}
								onChange={(e) => {
									const value = e.target.value;
									handleEmailChange(value);
									setFieldValue('email', value); // Оновлюємо значення у Formik
								}}
							/>
							<Field
								name={'phone_number'}
								placeholder={'+38 066 666 66 66'}
								title={'Phone Number'}
								component={
									PhoneInputField<{
										name: string;
										last_name: string;
										email: string;
										phone_number: string;
										password: string;
										confPassword: string;
									}>
								}
							/>
						</div>
						<div className={styles.inputWrapper}>
							<InputPassword
								title={'Password'}
								name={'password'}
								placeholder={'Enter Password'}
							/>
							<InputPassword
								title={'Confirm Password '}
								name={'confPassword'}
								placeholder={'Enter Password'}
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
							{error !== '' && <div className={styles.errorText}>{error}</div>}
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
		</>
	);
}
