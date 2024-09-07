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
import {
	removeCouponById,
	updateCoupon,
} from '@/services/dashboard/coupons/dashboard.coupons.service';
import { formatDate } from '@/utils/func/formatDate';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import { categoryValid } from '@/validation/dashboard/category/validation';

import styles from './styles.module.scss';

export interface IProps {
	coupon: ICoupon;
}

export default function EditCoupon(props: IProps) {
	const { coupon } = props;
	const [modal, setModal] = useState<boolean>(false);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	return (
		<Formik
			initialValues={{
				code: coupon.code,
				discount: coupon.discount,
				active: `${coupon.active}`,
				valid_to: formatDate(coupon.valid_to),
			}}
			validationSchema={yup
				.object({
					code: categoryValid('Name'),
					discount: yup
						.number()
						.min(0, 'Can`t be less than 0')
						.max(100, 'Can`t be more than 100')
						.required('Обов’язкове поле'),
					active: categoryValid('Active'),
					valid_to: categoryValid('Valid Until'),
				})
				.required()}
			onSubmit={async (values, { resetForm }) => {
				setIsLoading(true);
				const res = await updateCoupon(coupon.id, {
					...values,
					active: values.active === 'true',
				});
				if (res.success) {
					setIsLoading(false);
					setSuccess('Coupon updated successfully');
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
			{({ isValid }) => (
				<Form className={styles.wrapper}>
					{isLoading && <Loader className={styles.loader} />}

					{success !== '' && <MessageSuccess text={success} />}
					{error !== '' && <MessageError text={error} />}
					{modal && (
						<ModalConfirmation
							reset={async () => {
								setIsLoading(true);
								const res = await removeCouponById(coupon.id);
								if (res.success) {
									setModal(false);
									setIsLoading(false);
									setSuccess('Coupon deleted successfully');
									setTimeout(() => {
										router.push('/dashboard/coupons');
									}, 2000);
								} else {
									setIsLoading(false);
									setError('Something went wrong');
								}
							}}
							closeModal={() => setModal(false)}
							text={'Are you sure?'}
						/>
					)}

					<CreateDashboardHeader
						title={`Edit Coupon ${coupon.id}`}
						callbackApply={() => {}}
						callbackDelete={() => setModal(true)}
						disabledDelete={false}
						disabledApply={!isValid}
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
									defaultValue={{
										name: coupon.active ? 'Active' : 'Inactive',
										id: coupon.active ? 'true' : 'false',
									}}
									name={'active'}
									options={[
										{ name: 'Active', id: 'true' },
										{ name: 'Inactive', id: 'false' },
									].filter((item) => (item.id === 'true') !== coupon.active)}
									text={'Status'}
								/>
							</div>
							<div className={styles.couponWrapper}>
								<Input
									name={'discount'}
									title={'Discount amount, %'}
									type={'number'}
									placeholder={'Enter discount amount'}
								/>
								<Input
									name={'valid_to'}
									title={'Valid until'}
									type={'text'}
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
