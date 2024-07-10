'use client';

import { Form, Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import * as yup from 'yup';

import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import InputPassword from '@/components/InputPassword/InputPassword';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { emailValid } from '@/validation/checkout/validation';

import styles from './styles.module.scss';
import Google from '../../../../../public/login/google.svg';

export default function LoginWrapper() {
	const [openPass, setOpenPass] = useState<boolean>(true);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1 className={styles.title}>Welcome to</h1>

				<div className={styles.logo}>
					<Image src={'/logo.svg'} alt={'logo'} width={300} height={165} />
				</div>
			</div>
			<div className={styles.body}>
				<Formik
					initialValues={{
						email: '',
						password: '',
					}}
					validationSchema={yup
						.object({
							email: emailValid,
							password: yup.string().required('Password is required'),
						})
						.required()}
					onSubmit={async (values) => {}}
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
									disabled={!(isValid && dirty)}
									type={'submit'}
									style={'primary'}
									text={'Log in!'}
								></Button>
								<Button style={'secondary'} text={'Create an account'}></Button>
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
		</div>
	);
}
