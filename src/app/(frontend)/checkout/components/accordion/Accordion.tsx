'use client';
import { ReactNode } from 'react';

import styles from './styles.module.scss';
import ArrowTop from '../../../../../../public/arrowTop.svg';

export interface IAccordion {
	title: string;
	children: ReactNode;
	setActive: (active: boolean) => void;
	active: boolean;
}

export default function Accordion(props: IAccordion) {
	const { title, children, setActive, active } = props;
	return (
		<div className={`${styles.container} ${active && styles.active}`}>
			<div
				onClick={() => setActive(!active)}
				className={`${styles.head} ${active && styles.activeHead}`}
			>
				<span className={styles.title}>{title}</span>
				<ArrowTop className={`${styles.img} ${!active && styles.rotate}`} />
			</div>
			{active && <div className={styles.body}>{children}</div>}
		</div>
	);
}
