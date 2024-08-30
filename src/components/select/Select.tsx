import { useField } from 'formik';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';

export interface IProps {
	name: string;
	className?: string;
	defaultValue?: {
		name: string;
		id: number | string;
	};
	options?:
		| {
				name: string;
				id: number | string;
		  }[]
		| null;
	text: string;
}

export default function Select(props: IProps) {
	const { className = '', defaultValue, text, options, ...rest } = props;
	const [field, meta] = useField(rest);

	const inputClassName = `${styles.searchInput} ${meta.touched && meta.error ? styles.inputError : meta.touched ? styles.inputSuccess : ''}`;

	return (
		<div className={`${styles.wrapper} ${className}`}>
			<span className={`${styles.text} ${robotoCondensed.className}`}>
				{text}
			</span>
			<div className={`${styles.searchContainer}`}>
				<select {...field} className={inputClassName}>
					{defaultValue?.name ? (
						<option value={defaultValue.id}>{defaultValue.name}</option>
					) : (
						<option value="">Select a Category</option>
					)}
					{options?.map((option) => (
						<option
							value={option.id}
							key={option.id}
							className={`${styles.suggestionItem}`}
						>
							{option.name}
						</option>
					))}
				</select>
			</div>
			{meta.touched && meta.error ? (
				<span className={`${styles.error}`}>{meta.error}</span>
			) : null}{' '}
		</div>
	);
}
