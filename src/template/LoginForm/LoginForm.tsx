'use client';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import ForgotPasswordModal from '@/components/ForgotPasswordModal/ForgotPasswordModal';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import { fetchWithCookies } from '@/services/cookies/cookies.service';
import { useUser } from '@/store/user/User.store';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { IResponseAuth } from '@/types/response/response';
import { CookiesEnums } from '@/utils/enums/cookiesEnums';
import { emailValid, passwordValid } from '@/validation/checkout/validation';

import styles from './styles.module.scss';
import Google from '../../../public/login/google.svg';

export default function LoginForm() {
	const setUser = useUser((state) => state.setUser);
	const navigate = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validationSchema={yup
				.object({
					email: emailValid,
					password: passwordValid,
				})
				.required()}
			onSubmit={async (values) => {
				setIsLoading(true);
				const res = await fetchWithCookies<IResponseAuth>('/auth/login/', {
					method: 'POST',
					body: JSON.stringify({
						email: values.email,
						password: values.password,
					}),
				});
				if ('user' in res && res.user) {
					setIsLoading(false);
					Cookies.set(CookiesEnums.access_token, res.access_token.value, {
						expires: res.access_token.expires,
					});
					Cookies.set(CookiesEnums.refresh_token, res.refresh_token.value, {
						expires: res.refresh_token.expires,
						secure: true,
						sameSite: 'None',
						path: '/',
					});
					setUser(res.user);
					navigate.push('/');
				} else if ('error' in res && res.error) {
					setIsLoading(false);
					setError(res.error.message);
				}
			}}
		>
			{({ isValid, dirty }) => (
				<Form className={styles.form}>
					{isLoading && <Loader className={styles.loader} />}
					{error !== '' && (
						<MessageError classname={styles.errorMessage} text={error} />
					)}
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
							disabled={!(isValid && dirty)}
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
							<span className={robotoCondensed.className}>Or sing in with</span>
							<Google className={styles.googleImage} />
						</div>
					</div>
					{isModalOpen && (
						<ForgotPasswordModal onClose={() => setIsModalOpen(false)} />
					)}
				</Form>
			)}
		</Formik>
	);
}
