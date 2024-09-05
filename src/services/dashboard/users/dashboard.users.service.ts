import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchWithAuthServer } from '@/services/auth/fetchApiAuthServer.service';

export const getUsersDashboardServer = async () => {
	return await fetchWithAuthServer<IResponse<IUser>>('auth/customers/', {
		method: 'GET',
	});
};
export const getDashboardUsers = async (page: number) => {
	return await fetchWithAuth<IResponse<IUser>>(`/auth/customers?page=${page}`, {
		method: 'GET',
	});
};

// export const removeUserById = async (id: number) => {
// 	const res = await fetchWithAuth(`/auth/customers/${id}`, {
// 		method: 'DELETE',
// 	});
// 	return res as boolean;
// };
