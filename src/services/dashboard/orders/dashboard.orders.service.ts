import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchWithAuthServer } from '@/services/auth/fetchApiAuthServer.service';

export const getOrdersDashboardServer = async () => {
	const res = await fetchWithAuthServer('checkout/orders/', {
		method: 'GET',
	});
	return res.data as IResponse<IOrders>;
};

export const removeOrderById = async (id: number) => {
	const res = await fetchWithAuth(`/checkout/orders/${id}`, {
		method: 'DELETE',
	});
	return res as boolean;
};

export const getDashboardOrders = async (page: number) => {
	const res = await fetchWithAuth(`/checkout/orders?page=${page}`, {
		method: 'GET',
	});
	return res.data as IResponse<IOrders>;
};
