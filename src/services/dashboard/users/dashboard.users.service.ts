import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';

export const getUsersDashboardServer = async () => {
	const res = await fetchWithAuth('auth/customers/', {
		method: 'GET',
	});
	console.log(res);
	return res.data as IDashboardUsers;
};

// export const removeUserById = async (id: number) => {
// 	const res = await fetchWithAuth(`/auth/customers/${id}`, {
// 		method: 'DELETE',
// 	});
// 	return res as boolean;
// };

export const getDashboardUsers = async (page: number) => {
	const res = await fetchWithAuth(`/auth/customers?page=${page}`, {
		method: 'GET',
	});
	return res.data as IDashboardUsers;
};
