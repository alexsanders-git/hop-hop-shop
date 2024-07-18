import Link from 'next/link';

import Plus from '@/assets/svg/plus.svg';

import styles from './styles.module.scss';

export interface IProps {
	className?: string;
}

export default function DashboardPlusButton(props: IProps) {
	const { className = '' } = props;
	return (
		<Link className={`${styles.container} ${className}`} href={''}>
			<Plus />
		</Link>
	);
}
