import Image from 'next/image';
import { forwardRef, Ref } from 'react';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './ActionModal.module.scss';
import ButtonLink from '../ButtonLink/ButtonLink';

interface ModalProps {
	show: boolean;
	title: string;
	text: string;
	type: 'success' | 'error';
	onClose: () => void;
}

const ActionModal = forwardRef(function ActionModal(
	{ show, title, text, type, onClose }: ModalProps,
	ref: Ref<HTMLDivElement>,
) {
	if (!show) return null;

	const iconSrc =
		type === 'success'
			? '/thanksPageIllustration.svg'
			: '/unSuccessIllustration_wrong.svg';

	return (
		<div className={styles.backdrop}>
			<div
				className={`${styles.modalBody} ${type === 'error' ? styles.error : ''}`}
				ref={ref}
			>
				<div className={styles.textPart}>
					<h2 className={styles.title}>{title}</h2>
					<p className={`${styles.subtitle} ${robotoCondensed.className}`}>
						{text}
					</p>
				</div>
				<div
					className={`${styles.imageWrapper} ${type === 'error' ? styles.error : ''}`}
				>
					<Image
						src={iconSrc}
						width={121}
						height={200}
						alt={type === 'success' ? 'like' : 'error'}
					/>
				</div>
				<ButtonLink
					href={'/'}
					text={'Back to shopping!'}
					className={`${styles.closeButton} ${type === 'error' ? styles.error : ''}`}
				></ButtonLink>
			</div>
		</div>
	);
});

ActionModal.displayName = 'SuccessActionModal';
export default ActionModal;
