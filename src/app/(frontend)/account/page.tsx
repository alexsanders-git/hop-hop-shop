import Image from 'next/image';

import AdminAccountForm from './AdminAccountForm/AdminAccountForm';
import styles from './page.module.scss';

export default function page() {
	return (
		<div className={styles.pageWrp}>
			<div>
				<AdminAccountForm />
			</div>
			<div className={styles.imgWrp}>
				<Image
					width={391}
					height={391}
					src={'/illustration_admin.svg'}
					alt="admin"
				></Image>
			</div>
		</div>
	);
}
