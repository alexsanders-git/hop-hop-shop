'use client';
import { useRouter } from 'next/navigation';

import Edit from '@/assets/svg/edit.svg';

import styles from './styles.module.scss';

interface IProps {
	callback: () => string;
}

export default function EditButton(props: IProps) {
	const { callback } = props;
	const router = useRouter();
	return (
		<div className={styles.iconWrapper}>
			<Edit onClick={() => router.push(callback())} />
		</div>
	);
}
