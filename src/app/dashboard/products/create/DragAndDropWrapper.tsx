'use client';
import { useEffect } from 'react';
import { createSwapy } from 'swapy';
import UploadedFileBlock from '@/components/dashboard/uploadedFileBlock/UploadedFileBlock';
import { IPreview } from './page';

interface InterfaceDragAndDropWrapper {
	previews: IPreview[];
	handleRemoveImage: (index: number) => void;
	changeImagePosition: (index: number) => void;
	setPreviews: (previews: IPreview[]) => void;
}

export default function DragAndDropWrapper(props: InterfaceDragAndDropWrapper) {
	const { previews, changeImagePosition, handleRemoveImage, setPreviews } =
		props;

	useEffect(() => {
		const container = document.querySelector('.lectures')!;
		const swapy = createSwapy(container);

		swapy.onSwap((data) => {
			console.log(data);
			const newOrder = data.data.array.map((item: any) => {
				// Знаходимо елементи за uuid (itemId)
				return previews.find((preview) => preview.uuid === item.itemId);
			});
			console.log(newOrder);
			// @ts-ignore
			setPreviews(newOrder);

			// Перевірка на валідність нових даних
			// if (newOrder.every(item => item !== undefined)) {
			// 	setPreviews(newOrder as IPreview[]);
			// } else {
			// 	console.error('Error: Some items could not be found in the previews array.');
			// }
		});

		return () => {
			swapy.destroy();
		};
	}, []);

	return (
		<div className={'product-drag-drop lectures'}>
			{previews.map((preview, index) => {
				return (
					<UploadedFileBlock
						visibylity={index === 0 ? true : false}
						key={index}
						image={preview}
						index={index + 1}
						handleRemoveImage={handleRemoveImage}
						changeImagePosition={changeImagePosition}
					/>
				);
			})}
		</div>
	);
}
