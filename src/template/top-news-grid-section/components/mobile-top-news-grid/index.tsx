import TopNewsGridCard from '../top-news-card';

import styles from './styles.module.scss';

interface IProps {
	theHottest: INews;
	hopHopChoice: INews;
	oneLove: INews;
	customerSecret: INews;
}

export default function MobileTopNewsGrid({
	customerSecret,
	hopHopChoice,
	oneLove,
	theHottest,
}: IProps) {
	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<picture>
					<img src={'/news/magazineMobile.svg'} alt="Magazine" />
				</picture>
			</div>
			<div className={styles.column}>
				<a
					title="THE HOTTEST"
					className={`${styles.block}`}
					href={theHottest?.id ? `/news/${theHottest.id}` : '/news'}
				>
					<TopNewsGridCard
						title="THE HOTTEST"
						news={theHottest}
						type="theHottest"
						key={theHottest?.id || 'theHottest-default'}
					/>
				</a>
				<a
					title="HOP HOP CHOICE"
					className={`${styles.block}`}
					href={hopHopChoice?.id ? `/news/${hopHopChoice.id}` : '/news'}
				>
					<TopNewsGridCard
						title="HOP HOP CHOICE"
						news={hopHopChoice}
						type="hopHopChoice"
						key={hopHopChoice?.id || 'hopHopChoice-default'}
					/>
				</a>
				<a
					title="CUSTOMER SECRET"
					className={`${styles.block}`}
					href={customerSecret?.id ? `/news/${customerSecret.id}` : '/news'}
				>
					<TopNewsGridCard
						title="CUSTOMER SECRET"
						news={customerSecret}
						type="customerSecret"
						key={customerSecret?.id || 'customerSecret-default'}
					/>
				</a>
				<a
					title="ONE LOVE"
					className={`${styles.block}`}
					href={oneLove?.id ? `/news/${oneLove.id}` : '/news'}
				>
					<TopNewsGridCard
						title="ONE LOVE"
						news={oneLove}
						type="oneLove"
						key={oneLove?.id || 'oneLove-default'}
					/>
				</a>
			</div>
		</div>
	);
}
