import { Data } from '@/store/cart/Cart.store';

interface ApiResponseFetchCart {
	success: boolean;
	data: Data;
}

interface ApiResponseAddCart {
	success: boolean;
	data: {
		message: string;
	};
}

export const fetchCart = async (): Promise<ApiResponseFetchCart | null> => {
	try {
		const baseURL = process.env.NEXT_PUBLIC_API_URL;

		const res = await fetch(`${baseURL}/cart/`, {
			credentials: 'include',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await res.json();
		console.log(json.data);
		return json.data;
	} catch (error) {
		console.error('Failed to fetch product data:', error);
		return null;
	}
};

export const fetchAddItemToCart = async (
	id: number,
): Promise<ApiResponseAddCart | null> => {
	try {
		const baseURL = process.env.NEXT_PUBLIC_API_URL;

		const res = await fetch(`${baseURL}/cart/add/${id}/`, {
			credentials: 'include',
			mode: 'cors',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await res.json();
		console.log(json.data);
		return json.data;
	} catch (error) {
		console.error('Failed to fetch product data:', error);
		return null;
	}
};
