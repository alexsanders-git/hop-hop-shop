'use client';

interface IButtonProps {
	text: string;
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	style?: 'primary' | 'secondary';
}

import styles from './Button.module.scss';

export default function Button({
	text,
	onClick,
	className = '',
	disabled = false,
	style = 'primary',
	type = 'button',
}: IButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			className={`${styles.button} ${className} ${style === 'secondary' ? styles.secondary : styles.primary}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
}
