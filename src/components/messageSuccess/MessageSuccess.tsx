import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

export interface IProps {
	text: string;
}

export default function MessageSuccess(props: IProps) {
	const { text = 'Success' } = props;
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	if (!isVisible) {
		return null;
	}
	return <div className={styles.container}>{text}</div>;
}
