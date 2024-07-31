'use client';
import Remove from '@/assets/svg/remove.svg';

import styles from './styles.module.scss';

interface IProps {
	callback: () => void;
}

export default function RemoveButton(props: IProps) {
	const { callback } = props;
	return (
		<div className={styles.iconWrapper}>
			<Remove onClick={() => callback()} />
		</div>
	);
}
