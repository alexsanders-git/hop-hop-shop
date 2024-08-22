import { IFormValuesProfile } from '@/app/(frontend)/account/AccountForm/AccountForm';
import { fetchWithAuth } from '@/services/auth/fetchApiAuth.service';

export const updateProfile = async (data: IFormValuesProfile) => {
	const res = await fetchWithAuth('auth/profile/', {
		method: 'PATCH',
		body: JSON.stringify(data),
	});
	return res;
};
