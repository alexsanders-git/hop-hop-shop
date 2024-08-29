import Image from 'next/image';

import Button from '@/components/Button/Button';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './SuccessActionModal.module.scss';

interface ModalProps {
	show: boolean;
	title: string;
	text: string;
	onClose: () => void;
}

export const SuccessActionModal: React.FC<ModalProps> = ({
	show,
	title,
	text,
	onClose,
}) => {
	if (!show) return null;

	return (
		<div className={styles.backdrop}>
			<div className={styles.modalBody}>
				<div className={styles.textPart}>
					<h2 className={styles.title}>{title}</h2>
					<p className={`${styles.subtitle} ${robotoCondensed.className}`}>
						{text}
					</p>
					<Button
						text={'Back to shopping!'}
						onClick={onClose}
						className={styles.closeButton}
					></Button>
				</div>
				<div className={styles.imageWrapper}>
					<Image
						src={'/thanksPageIllustration.svg'}
						width={121}
						height={200}
						alt={'like'}
					/>
				</div>
			</div>
		</div>
	);
};
