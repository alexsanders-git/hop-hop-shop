'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ActionModal from '../../components/ActionModal/ActionModal';
import styles from './styles.module.scss';
import { emailVerify } from '@/services/auth/fetchApiAuth.service';

const VerificationPopup = () => {
	const token = useSearchParams().get('token');
	const [isPopupVisible, setIsPopupVisible] = useState(false);
	const router = useRouter();
	useEffect(() => {
		if (token) {
			verifyTokenHandler(token);
		}
	}, [token]);

	useEffect(() => {
		if (isPopupVisible) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [isPopupVisible]);

	const verifyTokenHandler = async (token: string) => {
		const isVerify = await emailVerify(token);
		if (isVerify) {
			setIsPopupVisible(true);
		}
	};

	const handleClose = () => {
		setIsPopupVisible(false);
		router.push('/');
	};

	if (!isPopupVisible) return null;
	return (
		<div className={styles.actionModal}>
			<ActionModal
				show={isPopupVisible}
				iconSrc={'/verificatedToken.svg'}
				title="Congratulations!"
				text={'You’ve unlocked the secret level: Shopper Extraordinaire!'}
				type={'success'}
				onClose={handleClose}
				buttonAction={() => setIsPopupVisible(false)}
			/>
		</div>
	);
};

export default VerificationPopup;
