import AccountForm from '@/app/(frontend)/account/AccountForm/AccountForm';

import styles from './styles.module.scss';

type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardProductsId({ params: { id } }: Props) {
	return (
		<div className={styles.wrapper}>
			<AccountForm />
		</div>
	);
}
