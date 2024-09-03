'use client';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import ForgotPasswordModal from '@/components/ForgotPasswordModal/ForgotPasswordModal';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import SuccessActionModal from '@/components/SuccessActionModal/SuccessActionModal';
import useOutside from '@/hooks/useOutside';
import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { useUser } from '@/store/user/User.store';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { CookiesEnums } from '@/utils/enums/cookiesEnums';
import { emailValid } from '@/validation/checkout/validation';

import styles from './styles.module.scss';
import Google from '../../../public/login/google.svg';

export default function LoginForm() {
	const setUser = useUser((state) => state.setUser);
	const navigate = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const {
		ref: modalRef,
		isShow: isModalOpen,
		setIsShow: setIsModalOpen,
	} = useOutside(false);

	const successModalRef = useRef<HTMLDivElement>(null);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

	const handleForgotPasswordSubmit = (values: { email: string }) => {
		console.log(values.email);
		setIsModalOpen(false);
		setIsSuccessModalOpen(true);
	};

	return (
		<>
			{isModalOpen && (
				<ForgotPasswordModal
					ref={modalRef}
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleForgotPasswordSubmit}
				/>
			)}
			{isSuccessModalOpen && (
				<SuccessActionModal
					ref={successModalRef}
					show={isSuccessModalOpen}
					title="Thank you!"
					text="If this is a registered email address, an email will be sent to the address provided."
					onClose={() => setIsSuccessModalOpen(false)}
				/>
			)}
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={yup
					.object({
						email: emailValid,
						// password: passwordValid,
					})
					.required()}
				onSubmit={async (values) => {
					setIsLoading(true);
					const res = await fetchWithAuth('auth/login/', {
						method: 'POST',
						body: JSON.stringify({
							email: values.email,
							password: values.password,
						}),
					});
					if (res.data) {
						setIsLoading(false);
						Cookies.set(CookiesEnums.access_token, res.data.access);
						setUser(res.data.user);
						navigate.push('/');
					} else if (res.error) {
						setIsLoading(false);
						setError(res.error);
					}
				}}
			>
				{({ isValid, dirty }) => (
					<Form className={styles.form}>
						{isLoading && <Loader className={styles.loader} />}
						{error !== '' && <MessageError text={error} />}
						<Input
							title={'Email'}
							type={'email'}
							name={'email'}
							placeholder={'Enter Email'}
						/>
						<InputPassword
							title={'Password'}
							name={'password'}
							placeholder={'Enter Password'}
						/>
						<div className={styles.buttonsWrap}>
							<p className={styles.forgot} onClick={() => setIsModalOpen(true)}>
								I forgot my password
							</p>
							<Button
								// disabled={!(isValid && dirty)}
								type={'submit'}
								style={'primary'}
								text={'Log in!'}
							></Button>
							<ButtonLink
								className={styles.buttonLink}
								href={'/registration'}
								style={'secondary'}
								text={'Create an account'}
							/>
							{error !== '' && <div className={styles.error}>{error}</div>}
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
