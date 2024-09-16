'use client';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';
import * as yup from 'yup';

import CreateDashboardHeader from '@/components/dashboard/createDashboardHeader/CreateDashboardHeader';
import DashboardUploadImage from '@/components/dashboard/dashboardUploadImage/DashboardUploadImage';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import Textarea from '@/components/textarea/Textarea';
import {
	createCategory,
	createCategoryImage,
} from '@/services/dashboard/categories/dashboard.categories.service';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import { categoryValid } from '@/validation/dashboard/category/validation';

import styles from './styles.module.scss';

export default function DashboardCategoriesCreate() {
	const [modal, setModal] = useState<boolean>(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFile(event.target.files[0]);

			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setPreview(reader.result as string);
				};
				reader.readAsDataURL(file);
			}
		}
	};

	return (
		<Formik
			initialValues={{
				name: '',
				description: '',
			}}
			validationSchema={yup
				.object({
					name: categoryValid('Name'),
					description: categoryValid('Description'),
				})
				.required()}
			onSubmit={async (values, { resetForm }) => {
				setIsLoading(true);
				const res = await createCategory(values);
				const formData = new FormData();

				if (selectedFile) {
					formData.append('image', selectedFile);
				}

				if (res.success && formData) {
					const resUpload = await createCategoryImage(res.data.id, formData);
					if (resUpload.success) {
						resetForm();
						setSelectedFile(null);
						setPreview(null);
						setIsLoading(false);
						setSuccess(true);
						await revalidateFunc('/dashboard/categories');
						await revalidateFunc('/dashboard/products');
						await revalidateFunc('/', 'layout');
						setTimeout(() => {
							router.push('/dashboard/categories');
						}, 2000);
					} else if (!res.success) {
						setIsLoading(false);
						setError(resUpload.error.message);
					}
				}
			}}
		>
			{({ isValid, dirty, resetForm }) => (
				<Form className={styles.wrapper}>
					{isLoading && <Loader />}

					{success && (
						<MessageSuccess type={'dashboard'} text={'Your Category Added!'} />
					)}
					{error !== '' && <MessageError type={'dashboard'} text={error} />}
					{modal && (
						<ModalConfirmation
							reset={() => {
								setModal(false);
								setSelectedFile(null);
								resetForm();
								setPreview(null);
							}}
							closeModal={() => setModal(false)}
							text={'Are you sure?'}
						/>
					)}

					<CreateDashboardHeader
						title={'New category'}
						callbackApply={() => {}}
						callbackDelete={() => {
							setModal(true);
						}}
						disabledDelete={false}
						disabledApply={!(isValid && dirty && selectedFile)}
						typeApply={'submit'}
						typeDelete={'button'}
					/>

					<div className={styles.formWrapper}>
						<div className={styles.form}>
							<Input
								name={'name'}
								title={'Category Name'}
								type={'text'}
								placeholder={'Enter Category Name'}
							/>
							<Textarea
								title={'Category Description'}
								name={'description'}
								rows={10}
								placeholder={'Enter Category Description'}
							/>
						</div>
						<DashboardUploadImage
							handleFileChange={handleFileChange}
							preview={preview}
							setPreview={setPreview}
							text={'Category Image'}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
}
