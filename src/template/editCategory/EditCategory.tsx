'use client';

import { Form, Formik } from 'formik';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import * as yup from 'yup';

import image from '@/assets/png/Newdescription.png';
import CreateDashboardHeader from '@/components/dashboard/createDashboardHeader/CreateDashboardHeader';
import ModalConfirmation from '@/components/dashboard/modalConfirmation/ModalСonfirmation';
import Input from '@/components/Input/Input';
import Textarea from '@/components/textarea/Textarea';
import {
	createCategoryImage,
	updateCategory,
} from '@/services/dashboard/categories/dashboard.categories.service';
import { robotoCondensed } from '@/styles/fonts/fonts';
import { categoryValid } from '@/validation/dashboard/category/validation';

import styles from './styles.module.scss';

export interface IProps {
	category: ICategory;
}

export default function EditCategory(props: IProps) {
	const { category } = props;

	const [modal, setModal] = useState<boolean>(false);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(category.image);

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
				name: category.name,
				description: category.description,
			}}
			validationSchema={yup
				.object({
					name: categoryValid('Name'),
					description: categoryValid('Description'),
				})
				.required()}
			onSubmit={async (values, { resetForm }) => {
				console.log(values);
				const res = await updateCategory(values);
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
					}
				}
			}}
		>
			{({ isValid, dirty, resetForm }) => (
				<Form className={styles.wrapper}>
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
						// disabledApply={!(isValid && dirty && selectedFile)}
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
								title={'Category'}
								name={'description'}
								rows={10}
								placeholder={'Enter Category Name'}
							/>
						</div>
						<div className={styles.uploadImage}>
							<span className={`${styles.text} ${robotoCondensed.className}`}>
								Category Image
							</span>
							<div className={styles.imageContainer}>
								{preview && (
									<Image
										className={styles.preview}
										width={500}
										height={500}
										src={preview}
										alt="preview-image"
									/>
								)}
								<input
									onChange={handleFileChange}
									accept="image/png, image/jpeg"
									className={styles.file}
									type="file"
								/>
								<div
									className={`${styles.imageContainer_desc} ${preview && styles.hide}`}
								>
									<Image src={image} alt={'image'} />
									<div
										className={`${styles.subText} ${robotoCondensed.className}`}
									>
										Drop your imager here, or browse jpeg, png are allowed
									</div>
								</div>
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
}
