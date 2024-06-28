import { ReactNode } from 'react';

import styles from './styles.module.scss';

export interface ICircleBackground {
	onclick: () => void;
	className?: string;
	children: ReactNode;
}

export default function CircleBackground({
	onclick,
	className = '',
	children,
}: ICircleBackground) {
	return (
		<button className={`${styles.wrapper} ${className}`} onClick={onclick}>
			{children}
		</button>
	);
}
