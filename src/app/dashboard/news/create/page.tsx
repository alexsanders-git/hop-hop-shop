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
import { categoryValid } from '@/validation/dashboard/category/validation';

import styles from './styles.module.scss';

export default function DashboardNewsCreate() {
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
					name: categoryValid('Title'),
					description: categoryValid('Description'),
				})
				.required()}
			onSubmit={async (values, { resetForm }) => {
				alert('Backend not provided');
				// setIsLoading(true);
				// const res = await createNews(values);
				// const formData = new FormData();
				//
				// if (selectedFile) {
				// 	formData.append('image', selectedFile);
				// }
				// if (res.success && formData) {
				// 	const resUpload = await createNewsImage(res.data.id, formData);
				// 	if (resUpload.success) {
				// 		resetForm();
				// 		setSelectedFile(null);
				// 		setPreview(null);
				// 		setIsLoading(false);
				// 		setSuccess(true);
				// 		await revalidateFunc('/dashboard/news');
				// 		setTimeout(() => {
				// 			router.push('/dashboard/news');
				// 		}, 2000);
				// 	} else {
				// 		setIsLoading(false);
				// 		setError(resUpload.error);
				// 	}
				// }
			}}
		>
			{({ isValid, dirty, resetForm }) => (
				<Form className={styles.wrapper}>
					{isLoading && <Loader />}

					{success && <MessageSuccess text={'Your News Added!'} />}
					{error !== '' && <MessageError text={error} />}
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
						title={'Add news'}
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
								title={'Title'}
								type={'text'}
								placeholder={'Enter title'}
							/>
							<Textarea
								title={'Description'}
								name={'description'}
								rows={10}
								placeholder={'Enter description'}
							/>
						</div>
						<DashboardUploadImage
							handleFileChange={handleFileChange}
							preview={preview}
							setPreview={setPreview}
							text={'News Image'}
						/>
					</div>
				</Form>
			)}
		</Formik>
	);
}
