'use client';
import { Form, Formik, FormikProps } from 'formik';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState } from 'react';
import * as yup from 'yup';

import image from '@/assets/png/Newdescription.png';
import Button from '@/components/Button/Button';
import CreateDashboardHeader from '@/components/dashboard/createDashboardHeader/CreateDashboardHeader';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import UploadedFileBlock from '@/components/dashboard/uploadedFileBlock/UploadedFileBlock';
import Input from '@/components/Input/Input';
import Loader from '@/components/Loader/Loader';
import MessageError from '@/components/messageError/MessageError';
import MessageSuccess from '@/components/messageSuccess/MessageSuccess';
import Select from '@/components/select/Select';
import Textarea from '@/components/textarea/Textarea';
import {
	createProduct,
	createProductImage,
} from '@/services/dashboard/products/dashboard.products.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import PrePublishProduct from '@/template/prePublishProduct/PrePublishProduct';
import { revalidateFunc } from '@/utils/func/revalidate/revalidate';
import { categoryValid } from '@/validation/dashboard/category/validation';

import styles from './styles.module.scss';
import { useFetch } from '@/hooks/useFetch';

interface FormValues {
	name: string;
	description: string;
	category: string;
	price: string;
}

export default function DashboardProductsCreate() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [showPrePublish, setShowPrePublish] = useState<boolean>(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState('');
	const [modal, setModal] = useState<boolean>(false);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [previews, setPreviews] = useState<{ image: string; name: string }[]>(
		[],
	);
	const { data: categories } = useFetch<ICategory[]>({
		endpoint: 'shop/categories/all/',
		options: {
			method: 'GET',
		},
	});
	const formikRef = useRef<FormikProps<FormValues>>(null);
	const fileInputRef = useRef<null | HTMLInputElement>(null);
	const router = useRouter();
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files);
			setSelectedFiles(filesArray);

			const previewsArray = filesArray.map((file) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				return new Promise<{ image: string; name: string }>((resolve) => {
					reader.onloadend = () => {
						resolve({ image: reader.result as string, name: file.name });
					};
				});
			});

			Promise.all(previewsArray).then((previews) => {
				setPreviews(previews);
			});
		}
	};

	const handleRemoveImage = (index: number) => {
		const newPreviews = previews.filter((_, i) => i !== index);
		setPreviews(newPreviews);
		const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
		setSelectedFiles(newSelectedFiles);
	};

	return (
		<>
			{showPrePublish && (
				<PrePublishProduct
					setShowPrePublish={setShowPrePublish}
					product={{
						name: `${formikRef.current?.values.name}`,
						description: `${formikRef.current?.values.description}`,
						id: 0,
						price: Number(formikRef.current?.values.price),
						category: categories!.filter(
							(category) =>
								category.id === Number(formikRef.current!.values.category),
						)[0],
						SKU: 0,
						slug: 'test',
						images: previews.map((preview) => {
							return {
								image: preview.image,
							};
						}),
					}}
				/>
			)}
			<Formik
				innerRef={formikRef}
				initialValues={{
					name: '',
					description: '',
					category: '',
					price: '',
				}}
				validationSchema={yup
					.object({
						name: categoryValid('Name'),
						description: categoryValid('Description'),
						category: categoryValid('Category'),
						price: categoryValid('Price'),
					})
					.required()}
				onSubmit={async (values, { resetForm }) => {
					setIsLoading(true);
					const res = await createProduct({
						...values,
						SKU: Math.floor(Math.random() * 1000),
					});
					const formData = new FormData();

					if (selectedFiles) {
						selectedFiles.forEach((file) => {
							formData.append('uploaded_images', file);
						});
					}
					if (res.success && formData) {
						const resUpload = await createProductImage(res.data.id, formData);

						if (resUpload.success) {
							setIsLoading(false);
							setSuccess(true);
							resetForm();
							setSelectedFiles([]);
							setPreviews([]);
							await revalidateFunc('/dashboard/products');
							await revalidateFunc('/');
							setTimeout(() => {
								router.push('/dashboard/products');
							}, 2000);
						} else if (!resUpload.success) {
							setError(resUpload.error.message);
						}
					}
				}}
			>
				{({ isValid, dirty, resetForm }) => (
					<Form className={styles.wrapper}>
						{isLoading && <Loader className={styles.loader} />}
						{success && (
							<MessageSuccess type={'dashboard'} text={'Your Product Added!'} />
						)}
						{error !== '' && <MessageError type={'dashboard'} text={error} />}
						{modal && (
							<ModalConfirmation
								reset={() => {
									setModal(false);
									resetForm();
									setSelectedFiles([]);
									setPreviews([]);
								}}
								closeModal={() => setModal(false)}
								text={'Are you sure?'}
							/>
						)}
						<CreateDashboardHeader
							title={'New Product '}
							callbackApply={() => {}}
							callbackDelete={() => {
								setModal(true);
							}}
							disabledDelete={false}
							disabledApply={!(isValid && dirty && selectedFiles.length > 0)}
							typeApply={'submit'}
							typeDelete={'button'}
						/>

						<div className={styles.container}>
							<div className={styles.form}>
								<Input
									name={'name'}
									title={'Product Name'}
									type={'text'}
									placeholder={'Enter Product Name'}
								/>
								{/* eslint-disable */}
								<Select
									name={'category'}
									options={
										categories
											? categories.map((item) => ({
													name: item.name,
													id: item.id,
												}))
											: null
									}
									text={'Product Category'}
								/>
								{/* eslint-enable*/}
								<Textarea
									title={'Product Description'}
									name={'description'}
									rows={10}
									placeholder={'Enter Product Description'}
								/>
								<Input
									name={'price'}
									title={'Product Price'}
									type={'text'}
									placeholder={'Enter Product Price'}
								/>
								<div className={styles.buttonWrapper}>
									<Button
										text={'Show pre-publish view'}
										style={'secondary'}
										disabled={!(isValid && dirty && selectedFiles.length > 0)}
										onClick={() => setShowPrePublish(true)}
									/>
								</div>
							</div>
							<div className={styles.imageWrapper}>
								{previews.length > 0 && (
									<div
										onMouseEnter={() => {
											if (previews[0].image) {
												setIsHovered(true);
											}
										}}
										onMouseLeave={() => {
											if (previews[0].image) {
												setIsHovered(false);
											}
										}}
										className={styles.firstPreview}
									>
										{isHovered && previews[0].image && (
											<div
												onClick={() => {
													handleRemoveImage(0);
												}}
												className={styles.removeImage}
											>
												<CircleX />
											</div>
										)}
										<Image
											className={styles.firstImage}
											width={480}
											height={470}
											src={previews[0].image}
											alt={previews[0].name}
										/>
									</div>
								)}
								{previews.length > 1 &&
									previews
										.slice(1)
										.map((preview, index) => (
											<UploadedFileBlock
												key={index}
												image={preview}
												index={index + 1}
												handleRemoveImage={handleRemoveImage}
											/>
										))}
								<div className={styles.uploadImage}>
									<span
										className={`${styles.text} ${robotoCondensed.className}`}
									>
										Product Gallery
									</span>
									<div className={styles.imageContainer}>
										<input
											ref={fileInputRef}
											onChange={handleFileChange}
											accept="image/png, image/jpeg"
											className={styles.file}
											type="file"
											multiple={true}
										/>
										<div className={`${styles.imageContainer_desc}`}>
											<Image src={image} alt={'image'} />
											<div
												className={`${styles.subText} ${robotoCondensed.className}`}
											>
												Drop your imager here, or browse jpeg, png are allowed
											</div>
										</div>
									</div>
								</div>
								<div className={styles.buttonWrapper}>
									<Button
										disabled={!(isValid && dirty && selectedFiles.length > 0)}
										text={'Show pre-publish view'}
										style={'secondary'}
										onClick={() => setShowPrePublish(true)}
									/>
								</div>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
}
