'use server';
import { revalidatePath } from 'next/cache';

export const revalidateFunc = async (path: string) => {
	console.log('work');
	return revalidatePath(path, 'page');
};
