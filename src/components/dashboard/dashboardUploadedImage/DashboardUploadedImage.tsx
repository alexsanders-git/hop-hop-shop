'use client';
import { CircleX } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import styles from './styles.module.scss';

interface IProps {
	image: string;
	index: number;
	handleRemoveImages: (index: number) => void;
}

export default function DashboardUploadedImage(props: IProps) {
	const { handleRemoveImages, index, image } = props;
	const [isHovered, setIsHovered] = useState<boolean>(false);
	return (
		<div
			key={index + image}
			className={styles.firstPreview}
			onMouseEnter={() => {
				setIsHovered(true);
			}}
			onMouseLeave={() => {
				setIsHovered(false);
			}}
		>
			{isHovered && (
				<div
					onClick={() => {
						handleRemoveImages(index);
					}}
					className={styles.removeImage}
				>
					<CircleX />
				</div>
			)}
			<Image
				className={styles.firstImage}
				width={480}
				height={470}
				src={image}
				alt={'image'}
			/>
		</div>
	);
}
