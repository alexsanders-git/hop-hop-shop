import DeliveredIcon from './delivered.svg';
import InTransitIcon from './inTransit.svg';
import styles from './OrderDetailsPictures.module.scss';
import PackedIcon from './packed.svg';
import PaidIcon from './paid.svg';

export default function OrderDetailsPictures() {
	const orderStages = [
		{ icon: PaidIcon, label: 'Paid' },
		{ icon: PackedIcon, label: 'Packed' },
		{ icon: InTransitIcon, label: 'In Transit' },
		{ icon: DeliveredIcon, label: 'Delivered' },
	];

	return (
		<div className={styles.iconsWrapper}>
			{orderStages.map((stage, index) => (
				<div className={styles.elementWrapper} key={index}>
					<div className={styles.iconWrapper}>
						<stage.icon className={styles.icon} />
					</div>
					<p className={styles.label}>{stage.label}</p>
				</div>
			))}
		</div>
	);
}
