import Image from 'next/image';
import Link from 'next/link';

import PriceTagIcon from './price-tag.svg';
import styles from './ProductCardSlider.module.scss';

interface IProps {
	id: number;
	name: string;
	price: number;
	images?: string;
}

export default function ProductCardSlider({ id, name, price, images }: IProps) {
	return (
		<div className={styles.card}>
			<Link href={`/product/${id}`}>
				<div className={styles.imgwrapper}>
					<Image
						src={images || '/not-ready.svg'}
						layout="fill"
						alt="image"
						className={styles.img}
					/>
				</div>
				<div className={styles.details}>
					<h3 className={styles.name}>{name}</h3>
					{/* <p className={styles.description}>{description}</p> */}
				</div>
				<div className={styles.pricetag}>
					<PriceTagIcon className={styles.icon} />
					<p className={styles.price}>{`$${price}`}</p>
				</div>
			</Link>
		</div>
	);
}
