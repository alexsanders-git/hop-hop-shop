import { ReactNode } from 'react';

import styles from './styles.module.scss';

export interface ICheckbox {
	label: string;
	type?: 'rounded' | 'square';
	className?: string;
	isChecked: boolean;
	setIsChecked: (isChecked: boolean) => void;
	children: ReactNode;
}

export default function Checkbox(props: ICheckbox) {
	const {
		isChecked,
		setIsChecked,
		label,
		type = 'rounded',
		className = '',
		children,
	} = props;
	return (
		<div
			onClick={() => {
				setIsChecked(!isChecked);
			}}
			className={`${styles.wrapper} ${className}`}
		>
			<div
				className={`${styles.checkbox} ${type === 'square' && styles.square}`}
			>
				{isChecked && <div className={styles.background}></div>}
			</div>
			<div className={styles.text}>
				{label}
				{children}
			</div>
		</div>
	);
}
