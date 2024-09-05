import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchWithAuthServer } from '@/services/auth/fetchApiAuthServer.service';

export const getOrdersDashboardServer = async () => {
	return await fetchWithAuthServer<IResponse<IOrders>>('checkout/orders/', {
		method: 'GET',
	});
};

export const removeOrderById = async (id: number) => {
	return await fetchWithAuth<{ detail: string }>(`checkout/orders/${id}`, {
		method: 'DELETE',
	});
};

export const getDashboardOrders = async (page: number) => {
	return await fetchWithAuth<IResponse<IOrders>>(
		`checkout/orders?page=${page}`,
		{
			method: 'GET',
		},
	);
};
