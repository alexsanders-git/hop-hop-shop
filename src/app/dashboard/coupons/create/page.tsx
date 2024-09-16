'use client';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as yup from 'yup';

import CreateDashboardHeader from '@/components/dashboard/createDashboardHeader/CreateDashboardHeader';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import Select from '@/components/select/Select';
import { createCoupon } from '@/services/dashboard/coupons/dashboard.coupons.service';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import { categoryValid } from '@/validation/dashboard/category/validation';

import styles from './styles.module.scss';

export default function DashboardCouponCreate() {
	const [modal, setModal] = useState<boolean>(false);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	return (
		<Formik
			initialValues={{
				code: '',
				discount: 0,
				active: '',
				valid_to: '',
			}}
			validationSchema={yup
				.object({
					code: categoryValid('Name'),
					discount: yup
						.number()
						.min(1, 'Can`t be less than 0')
						.max(99, 'Can`t be more than 99')
						.required('Обов’язкове поле'),
					active: categoryValid('Active'),
					valid_to: categoryValid('Valid Until'),
				})
				.required()}
			onSubmit={async (values, { resetForm }) => {
				setIsLoading(true);
				const res = await createCoupon({
					...values,
					valid_to: values.valid_to.split('-').reverse().join('-'),
					active: values.active === 'true',
				});
				if (res.success) {
					resetForm();
					setIsLoading(false);
					setSuccess(true);
					await revalidateFunc('/dashboard/coupons');
					setTimeout(() => {
						router.push('/dashboard/coupons');
					}, 2000);
				} else if (!res.success) {
					setIsLoading(false);
					setError(res.error.message);
				}
			}}
		>
			{({ isValid, dirty, resetForm }) => (
				<Form className={styles.wrapper}>
					{isLoading && <Loader />}

					{success && (
						<MessageSuccess type={'dashboard'} text={'Your Coupon Added!'} />
					)}
					{error !== '' && <MessageError type={'dashboard'} text={error} />}
					{modal && (
						<ModalConfirmation
							reset={() => {
								setModal(false);
								resetForm();
							}}
							closeModal={() => setModal(false)}
							text={'Are you sure?'}
						/>
					)}

					<CreateDashboardHeader
						title={'Add coupon'}
						callbackApply={() => {}}
						callbackDelete={() => {
							setModal(true);
						}}
						disabledDelete={false}
						disabledApply={!(isValid && dirty)}
						typeApply={'submit'}
						typeDelete={'button'}
					/>

					<div className={styles.formWrapper}>
						<div className={styles.form}>
							<div className={styles.couponWrapper}>
								<Input
									name={'code'}
									title={'Coupon Name'}
									type={'text'}
									placeholder={'Enter coupon name'}
								/>
								<Select
									className={styles.select}
									name={'active'}
									options={[
										{ name: 'Active', id: 'true' },
										{ name: 'Inactive', id: 'false' },
									]}
									text={'Status'}
								/>
							</div>
							<div className={styles.couponWrapper}>
								<Input
									name={'discount'}
									title={'Discount amount, %'}
									type={'number'}
									min={1}
									max={99}
									placeholder={'Enter discount amount'}
								/>
								<Input
									name={'valid_to'}
									title={'Valid until'}
									type={'date'}
									placeholder={'Enter valid until'}
								/>
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}
