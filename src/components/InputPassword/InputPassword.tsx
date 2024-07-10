'use client';
import { useField } from 'formik';
import { useState } from 'react';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './Input.module.scss';
import EyeOff from '../../../public/login/eyeOff.svg';
import EyeOn from '../../../public/login/eyeOn.svg';

interface InterfaceInputPassword {
	name: string;
	placeholder: string;
	title?: string;
	className?: string;
}

export default function InputPassword(props: InterfaceInputPassword) {
	const { title, className = '', ...rest } = props;
	const [field, meta] = useField(rest);
	const inputClassName = `${styles.input} ${meta.touched && meta.error ? styles.inputError : meta.touched ? styles.inputSuccess : ''}`;
	const [openPass, setOpenPass] = useState<boolean>(true);

	return (
		<div className={`${styles.inputWrapper} ${className}`}>
			{title && (
				<span className={`${styles.title} ${robotoCondensed.className}`}>
					{title}
				</span>
			)}
			<input
				{...field}
				{...rest}
				type={openPass ? 'password' : 'text'}
				className={inputClassName}
			/>
			{openPass && (
				<div onClick={() => setOpenPass(!openPass)} className={styles.eye}>
					<EyeOn />
				</div>
			)}
			{!openPass && (
				<div onClick={() => setOpenPass(!openPass)} className={styles.eye}>
					<EyeOff />
				</div>
			)}
			{meta.touched && meta.error ? (
				<span className={`${styles.error}`}>{meta.error}</span>
			) : null}
		</div>
	);
}
