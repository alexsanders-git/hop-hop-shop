import { Pencil } from 'lucide-react';

import styles from './styles.module.scss';

export interface IReadyData {
	firstText?: string;
	secondText?: string;
	thirdText?: string;
	fourText?: string;
	fiveText?: string;
	setOpened: () => void;
}

export default function ReadyData(props: IReadyData) {
	const { firstText, fourText, thirdText, secondText, fiveText, setOpened } =
		props;
	return (
		<div className={styles.readyData}>
			<div className={styles.userInfo}>
				{firstText && <span>{firstText}</span>}
				{secondText && <span>{secondText}</span>}
				{thirdText && <span>{thirdText}</span>}
				{fourText && <span>{fourText}</span>}
				{fiveText && <span>{fiveText}</span>}
			</div>
			<div onClick={() => setOpened()} className={styles.imgWrapper}>
				<Pencil className={styles.img} />
			</div>
		</div>
	);
}
