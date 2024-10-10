import { fetchData } from '@/services/fetchData';

export const getCatalogData = async () => {
	return await fetchData<IResponse<IProduct>>('/shop/products/', {
		method: 'GET',
	});
};
