'use client';

import { Form, Formik } from 'formik';
import { useSearchParams } from 'next/navigation';
import * as yup from 'yup';

import ActionModal from '@/components/ActionModal/ActionModal';
import Button from '@/components/Button/Button';
import InputPassword from '@/components/InputPassword/InputPassword';
import useOutside from '@/hooks/useOutside';
import { passwordValid } from '@/validation/checkout/validation';

import styles from './ResetPasswordForm.module.scss';

export interface IFormValuesProfile {
	newPassword?: string;
	confirmPassword?: string;
}

export default function ResetPasswordForm() {
	const searchParams = useSearchParams();

	console.log(searchParams);

	const {
		ref: modalRef,
		isShow: isModalOpen,
		setIsShow: setIsModalOpen,
	} = useOutside(false);

	const handleSubmit = (values: IFormValuesProfile) => {
		console.log(values);
		setIsModalOpen(true);
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
							title={'New password'}
							name={'newPassword'}
							placeholder={'New password'}
						/>
						<InputPassword
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
			<ActionModal
				ref={modalRef}
				show={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title={'Woohoo! You did it!'}
				text={`You've successfully reset your password. You're ready to rock and
						roll again!`}
				type={'success'}
			/>
		</>
	);
}
