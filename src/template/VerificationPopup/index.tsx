'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ActionModal from '../../components/ActionModal/ActionModal';
import styles from './styles.module.scss';
import { emailVerify } from '@/services/auth/fetchApiAuth.service';

const VerificationPopup = () => {
	const token = useSearchParams().get('token');
	const [isPopupVisible, setIsPopupVisible] = useState(false);

	useEffect(() => {
		if (token) {
			verifyTokenHandler(token);
		}
	}, [token]);

	const verifyTokenHandler = async (token: string) => {
		const isVerify = await emailVerify(token);
		if (isVerify) {
			setIsPopupVisible(true);
		}
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
				onClose={() => setIsPopupVisible(false)}
			/>
		</div>
	);
};

export default VerificationPopup;
