'use client';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { useUser } from '@/store/user/User.store';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { CookiesEnums } from '@/utils/enums/cookiesEnums';
import { emailValid } from '@/validation/checkout/validation';

import styles from './styles.module.scss';
import Google from '../../../public/login/google.svg';

export default function LoginForm() {
	const setUser = useUser((state) => state.setUser);
	const [error, setError] = useState<string | null>(null);
	const navigate = useRouter();
	return (
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
				const res = await fetchWithAuth('auth/login/', {
					method: 'POST',
					body: JSON.stringify({
						email: values.email,
						password: values.password,
					}),
				});
				if (res.data) {
					Cookies.set(CookiesEnums.access_token, res.data.access);
					setUser(res.data.user);
					navigate.push('/');
				} else if (res.error) {
					setError(res.error);
				}
			}}
		>
			{({ isValid, dirty }) => (
				<Form className={styles.form}>
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
						<Link className={styles.forgot} href={'#'}>
							I forgot my password
						</Link>
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
						{error && <div className={styles.error}>{error}</div>}
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
