import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchData } from '@/services/fetchData';

export const getDashboardCouponsServer = async (): Promise<
	IResponse<ICoupon>
> => {
	return await fetchData<IResponse<ICoupon>>('cart/coupon/');
};

export const getDashboardCoupons = async (page: number) => {
	const res = await fetchWithAuth(`cart/coupon?page=${page}`, {
		method: 'GET',
	});
	return res.data as IResponse<ICoupon>;
};
export const getCoupons = async (): Promise<IResponse<ICoupon>> => {
	const res = await fetchWithAuth('cart/coupon/');
	return res.data as IResponse<ICoupon>;
};
export const removeCouponById = async (id: number) => {
	const res = await fetchWithAuth(`cart/coupon/${id}`, {
		method: 'DELETE',
	});
	return res;
};
export const createCoupon = async (data: {
	code: string;
	discount: number;
	active: boolean;
	valid_to: string;
}) => {
	const res = await fetchWithAuth('cart/coupon/', {
		method: 'POST',
		body: JSON.stringify(data),
	});
	return res;
};
export const updateCoupon = async (
	id: number,
	data: {
		code: string;
		discount: number;
		active: boolean;
		valid_to: string;
	},
) => {
	const res = await fetchWithAuth(`cart/coupon/${id}/`, {
		method: 'PATCH',
		body: JSON.stringify(data),
	});
	return res;
};
export const getCouponById = async (id: string) => {
	const res = await fetchWithAuth(`cart/coupon/${id}`, {
		method: 'GET',
	});
	return res.data as ICoupon;
};
