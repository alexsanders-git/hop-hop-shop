// 'use client';
//
// import { Form, Formik } from 'formik';
// import { useRouter } from 'next/navigation';
// import { ChangeEvent, useState } from 'react';
// import * as yup from 'yup';
//
// import CreateDashboardHeader from '@/components/dashboard/createDashboardHeader/CreateDashboardHeader';
// import DashboardUploadImage from '@/components/dashboard/dashboardUploadImage/DashboardUploadImage';
// import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
// import Input from '@/components/Input/Input';
// import Loader from '@/components/Loader/Loader';
// import MessageError from '@/components/messageError/MessageError';
// import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
// import Textarea from '@/components/textarea/Textarea';
// import {
// 	createCategoryImage,
// 	removeCategoryById,
// 	updateCategory,
// } from '@/services/dashboard/categories/dashboard.categories.service';
// import { categoryValid } from '@/validation/dashboard/category/validation';
//
// import styles from './styles.module.scss';
//
// export interface IProps {
// 	news: INews;
// }
//
// export default function EditNews(props: IProps) {
// 	const { news } = props;
// 	const [modal, setModal] = useState<boolean>(false);
// 	const [selectedFile, setSelectedFile] = useState<File | null>(null);
// 	const [preview, setPreview] = useState<string | null>(news.image);
// 	const router = useRouter();
// 	const [isLoading, setIsLoading] = useState<boolean>(false);
// 	const [success, setSuccess] = useState('');
// 	const [error, setError] = useState('');
//
// 	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
// 		if (event.target.files && event.target.files.length > 0) {
// 			setSelectedFile(event.target.files[0]);
//
// 			const file = event.target.files[0];
// 			if (file) {
// 				const reader = new FileReader();
// 				reader.onloadend = () => {
// 					setPreview(reader.result as string);
// 				};
// 				reader.readAsDataURL(file);
// 			}
// 		}
// 	};
//
// 	return (
// 		<Formik
// 			initialValues={{
// 				name: news.title,
// 				description: news.date,
// 			}}
// 			validationSchema={yup
// 				.object({
// 					name: categoryValid('Name'),
// 					description: categoryValid('Description'),
// 				})
// 				.required()}
// 			onSubmit={async (values, { resetForm }) => {
// 				setIsLoading(true);
// 				if (selectedFile) {
// 					const formData = new FormData();
// 					formData.append('image', selectedFile);
// 					const res = await updateCategory(category.id, values);
// 					if (res.success && formData) {
// 						const resUpload = await createCategoryImage(res.data.id, formData);
// 						if (resUpload.success) {
// 							setIsLoading(false);
// 							setSuccess('Category updated successfully');
// 							setTimeout(() => {
// 								router.push('/dashboard/categories');
// 							}, 2000);
// 						} else {
// 							setIsLoading(false);
// 							setError(resUpload.error);
// 						}
// 					}
// 				} else {
// 					const res = await updateCategory(category.id, values);
// 					if (res) {
// 						setIsLoading(false);
// 						setSuccess('Category updated successfully');
// 						setTimeout(() => {
// 							router.push('/dashboard/categories');
// 						}, 2000);
// 					} else {
// 						setIsLoading(false);
// 						setError(res.error);
// 					}
// 				}
// 			}}
// 		>
// 			{({ isValid }) => (
// 				<Form className={styles.wrapper}>
// 					{isLoading && <Loader className={styles.loader} />}
//
// 					{success !== '' && <MessageSuccess text={success} />}
// 					{error !== '' && <MessageError text={error} />}
// 					{modal && (
// 						<ModalConfirmation
// 							reset={async () => {
// 								setIsLoading(true);
// 								const res = await removeCategoryById(category.id);
// 								if (res) {
// 									setModal(false);
// 									setIsLoading(false);
// 									setSuccess('Category deleted successfully');
// 									setTimeout(() => {
// 										router.push('/dashboard/categories');
// 									}, 2000);
// 								} else {
// 									setIsLoading(false);
// 									setError('Something went wrong');
// 								}
// 							}}
// 							closeModal={() => setModal(false)}
// 							text={'Are you sure?'}
// 						/>
// 					)}
//
// 					<CreateDashboardHeader
// 						title={`Edit Category ${category.id}`}
// 						callbackApply={() => {}}
// 						callbackDelete={() => setModal(true)}
// 						disabledDelete={false}
// 						disabledApply={!isValid}
// 						typeApply={'submit'}
// 						typeDelete={'button'}
// 					/>
//
// 					<div className={styles.formWrapper}>
// 						<div className={styles.form}>
// 							<Input
// 								name={'name'}
// 								title={'Category Name'}
// 								type={'text'}
// 								placeholder={'Enter Category Name'}
// 							/>
// 							<Textarea
// 								title={'Category Description'}
// 								name={'description'}
// 								rows={10}
// 								placeholder={'Enter Category Description'}
// 							/>
// 						</div>
// 						<DashboardUploadImage
// 							handleFileChange={handleFileChange}
// 							preview={preview}
// 							setPreview={setPreview}
// 							text={'Category Image'}
// 						/>
// 					</div>
// 				</Form>
// 			)}
// 		</Formik>
// 	);
// }
