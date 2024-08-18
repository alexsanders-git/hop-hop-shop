import Button from '@/components/Button/Button';

import styles from './styles.module.scss';

export interface IProps {
	text: string;
	reset: () => void;
	closeModal: () => void;
	className?: string;
}

export default function ModalConfirmation(props: IProps) {
	const { text, reset, closeModal, className = '' } = props;
	return (
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
					onClick={() => {
						reset();
					}}
					style={'primary'}
					className={styles.btn}
					text={'Delete'}
				/>
			</div>
		</div>
	);
}
