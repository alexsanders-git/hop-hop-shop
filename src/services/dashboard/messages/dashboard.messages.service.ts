import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';
import { fetchWithAuthServer } from '@/services/auth/fetchApiAuthServer.service';

export const getMessagesDashboardServer = async () => {
	return await fetchWithAuthServer<IResponse<IMessages>>('contact-us/', {
		method: 'GET',
	});
};

export const getMessagesDashboardClient = async (page: number) => {
	return await fetchWithAuth<IResponse<IMessages>>(`contact-us?page=${page}`, {
		method: 'GET',
	});
};

export const getMessageDashboardClient = async (id: number) => {
	return await fetchWithAuthServer<IMessages>(`contact-us/${id}`, {
		method: 'GET',
	});
};

interface ISendMessage {
	email: string;
	message: string;
}

export const sendQuickAnswer = async (data: ISendMessage) => {
	return await fetchWithAuth('contact-us/quick-answer/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
};
