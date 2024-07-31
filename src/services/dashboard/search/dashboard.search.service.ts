import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';

export const getDashboardSearch = async (type: string, search: string) => {
	const res = await fetchWithAuth(`shop/${type}/?name=${search}`, {
		method: 'GET',
	});
	return res.data.items as IDashboardSearch[];
};
