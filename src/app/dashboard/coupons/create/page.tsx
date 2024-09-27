'use client';
import { Form, Formik, FormikProps } from 'formik';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

import CreateDashboardHeader from '@/components/dashboard/createDashboardHeader/CreateDashboardHeader';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import Select from '@/components/select/Select';
import { createCoupon } from '@/services/dashboard/coupons/dashboard.coupons.service';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';

import styles from './styles.module.scss';
import { validationSchemaCoupon } from '@/validation/coupon/couponValidation';
import { useUnsavedChanges } from '@/hooks/useCloseWindow';

export default function DashboardCouponCreate() {
	const [modal, setModal] = useState<boolean>(false);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const [unsaved, setUnsaved] = useState<boolean>(false);
	const { isModalVisible, confirmNavigation, cancelNavigation } =
		useUnsavedChanges(unsaved);

	const ref = useRef<
		FormikProps<{
			code: string;
			discount: number;
			active: string;
			valid_to: string;
		}>
	>(null);

	const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === 'discount') {
			if (Number(value) > 90) {
				e.target.value = String(90);
			}
			ref.current?.handleChange(e);
		}
	};

	return (
		<Formik
			innerRef={ref}
			initialValues={{
				code: '',
				discount: 0,
				active: '',
				valid_to: '',
			}}
			validationSchema={validationSchemaCoupon}
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
					setTimeout(() => {
						setError('');
					}, 5000);
				}
			}}
		>
			{({ isValid, dirty, resetForm, initialValues, values }) => {
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useEffect(() => {
					const hasFormChanged =
						JSON.stringify(values) !== JSON.stringify(initialValues);
					setUnsaved(hasFormChanged);
				}, [values, initialValues]);
				return (
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
						{isModalVisible && (
							<ModalConfirmation
								type={'unsaved'}
								className={styles.height}
								reset={() => cancelNavigation()}
								closeModal={() => confirmNavigation()}
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
										max={90}
										placeholder={'Enter discount amount'}
										onChange={handleCustomChange}
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
				);
			}}
		</Formik>
	);
}
