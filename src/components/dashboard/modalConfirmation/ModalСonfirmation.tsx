import Button from '@/components/Button/Button';

import styles from './styles.module.scss';
import React from 'react';

export interface IProps {
	text: string;
	reset: (e: React.MouseEvent<HTMLButtonElement>) => void;
	closeModal: () => void;
	className?: string;
}

export default function ModalConfirmation(props: IProps) {
	const { text, reset, closeModal, className = '' } = props;
	return (
		<div className={styles.bgWrapper}>
			<div className={`${styles.container} ${className}`}>
				<span>{text}</span>
				<div className={styles.wrapper}>
					<Button
						onClick={() => {
							closeModal();
						}}
						style={'secondary'}
						className={styles.btn}
						text={'Cancel'}
					/>
					<Button
						onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
							reset(e);
						}}
						style={'primary'}
						className={styles.btn}
						text={'Delete'}
					/>
				</div>
			</div>
		</div>
	);
}
