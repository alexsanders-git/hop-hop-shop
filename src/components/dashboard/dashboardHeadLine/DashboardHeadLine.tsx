'use client';
import ButtonLink from '@/components/ButtonLink/ButtonLink';
import DashboardPlusButton from '@/components/dashboard/dashboardPlusButton/DashboardPlusButton';
import DashboardSearchBar from '@/components/dashboard/DashboardSearchBar/DashboardSearchBar';

import styles from './styles.module.scss';

interface IProps {
	compact: boolean;
	text: string;
	textButton?: string;
}

export default function DashboardHeadLine(props: IProps) {
	const { compact, text, textButton = '' } = props;
	return (
		<div
			className={`${styles.container} ${compact && styles.compactContainer}`}
		>
			<div className={styles.wrapper}>
				<div className={styles.text}>{text}</div>
				{!compact && (
					<>
						<div className={styles.actions}>
							<ButtonLink
								className={styles.button}
								href={''}
								text={textButton}
							/>
							<DashboardSearchBar />
						</div>
						<DashboardPlusButton className={styles.plus} />
					</>
				)}
			</div>
			<DashboardSearchBar
				className={`${styles.mobileSearch} ${compact && styles.compactSearch}`}
			/>
		</div>
	);
}
