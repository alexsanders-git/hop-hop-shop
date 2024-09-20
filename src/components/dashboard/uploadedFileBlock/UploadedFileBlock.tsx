import { Menu, Trash2 } from 'lucide-react';
import Image from 'next/image';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './styles.module.scss';
import { IPreview } from '@/app/dashboard/products/create/page';

export interface IProps {
	image: IPreview;
	index: number;
	handleRemoveImage: (index: number) => void;
	changeImagePosition: (index: number) => void;
	visibylity?: boolean;
}

export default function UploadedFileBlock(props: IProps) {
	const {
		image,
		handleRemoveImage,
		index,
		changeImagePosition,
		visibylity = false,
	} = props;
	return (
		<div className={visibylity ? styles.hidden : ''} data-swapy-slot={index}>
			<div className={styles.wrapper} data-swapy-item={image.uuid}>
				<Image
					width={78}
					height={78}
					className={styles.image}
					src={image.image}
					alt={image.name}
				/>
				<div className={styles.mainWrapper}>
					<span className={`${styles.text} ${robotoCondensed.className}`}>
						Product {image.name}
					</span>
					<div
						onClick={() => changeImagePosition(index)}
						className={styles.chooseWrapper}
					>
						<div className={styles.circle}></div>
						<span
							className={`${styles.chooseText}  ${robotoCondensed.className}`}
						>
							Choose as the main image
						</span>
					</div>
				</div>
				<div className={styles.buttons}>
					<Trash2
						className={styles.button}
						onClick={() => handleRemoveImage(index)}
					/>
					<Menu className={styles.button} color="#192C32" />
				</div>
			</div>
		</div>
	);
}
