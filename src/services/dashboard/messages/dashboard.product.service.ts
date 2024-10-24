import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';

export const getMessagesDashboard = async () => {
	return await fetchWithAuth<IResponse<IMessages>>('contact-us/', {
		method: 'GET',
	});
};

export const getMessageById = async (id: string) => {
	return await fetchWithAuth<IMessages>(`contact-us/${id}`, {
		method: 'GET',
	});
};
