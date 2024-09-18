import Image from 'next/image';
import { Suspense } from 'react';

import styles from './page.module.scss';
import ResetPasswordForm from './ResetPasswordForm/ResetPasswordForm';

export default function ResetPasswordPage() {
	return (
		<div className={styles.pageWrapper}>
			<div>
				<h1 className={styles.formTitle}>Password Reset</h1>
				<p className={styles.emailAddress}>user email adress</p>
			</div>
			<div className={styles.imageWrapper}>
				<Image
					src={'/illustration_password.svg'}
					width={300}
					height={360}
					alt={'image'}
				/>
			</div>
			<Suspense>
				<ResetPasswordForm />
			</Suspense>
		</div>
	);
}
