import Image from 'next/image';

import ButtonLink from '@/components/ButtonLink/ButtonLink';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './ResetPasswordSuccessModal.module.scss';

interface ModalProps {
	show: boolean;
	onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
	if (!show) return null;

	return (
		<div className={styles.backdrop}>
			<div className={styles.modalBody}>
				<div className={styles.textPart}>
					<h2 className={styles.title}>Woohoo! You did it!</h2>
					<p className={`${styles.subtitle} ${robotoCondensed.className}`}>
						You've successfully reset your password. You're ready to rock and
						roll again!
					</p>
				</div>
				<div className={styles.imageWrapper}>
					<Image
						src={'/thanksPageIllustration.svg'}
						width={121}
						height={200}
						alt={'like'}
					/>
				</div>
				<ButtonLink
					href={'/'}
					text={'Back to shopping!'}
					onClick={onClose}
					className={styles.closeButton}
				></ButtonLink>
			</div>
		</div>
	);
};
