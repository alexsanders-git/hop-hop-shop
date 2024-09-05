import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchData } from '@/services/fetchData';

export const getDashboardCouponsServer = async (): Promise<
	IResponseError | IResponse<ICoupon>
> => {
	return await fetchData<IResponse<ICoupon>>('cart/coupon/');
};

export const getDashboardCoupons = async (page: number) => {
	return await fetchWithAuth<IResponse<ICoupon>>(`cart/coupon?page=${page}`, {
		method: 'GET',
	});
};

export const removeCouponById = async (id: number) => {
	return await fetchWithAuth<{ detail: string }>(`cart/coupon/${id}`, {
		method: 'DELETE',
	});
};
export const createCoupon = async (
	data: Omit<ICoupon, 'valid_from' | 'id'>,
) => {
	return await fetchWithAuth<ICoupon>('cart/coupon/', {
		method: 'POST',
		body: JSON.stringify(data),
	});
};

export const updateCoupon = async (
	id: number,
	data: Omit<ICoupon, 'valid_from' | 'id'>,
) => {
	return await fetchWithAuth<ICoupon>(`cart/coupon/${id}/`, {
		method: 'PATCH',
		body: JSON.stringify(data),
	});
};
export const getCouponById = async (id: string) => {
	return await fetchWithAuth<ICoupon>(`cart/coupon/${id}`, {
		method: 'GET',
	});
};
