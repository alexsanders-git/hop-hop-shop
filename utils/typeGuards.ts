export const isArrayOfImages = (
	images: IImage | IImage[],
): images is IImage[] => {
	return Array.isArray(images);
};
