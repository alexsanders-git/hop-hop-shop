export interface InterfaceCouponResponse {
	message?: string;
	error?: string;
}

export const fetchCoupon = async (
	coupon: string,
): Promise<InterfaceCouponResponse | null> => {
	try {
		const baseURL = process.env.NEXT_PUBLIC_API_URL;

		const res = await fetch(`${baseURL}/cart/coupon/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				code: coupon,
			}),
		});
		const json = await res.json();
		console.log(json);
		return json.data;
	} catch (error) {
		console.error('Failed to fetch product data:', error);
		return null;
	}
};
