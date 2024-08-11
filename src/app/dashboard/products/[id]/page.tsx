import { notFound } from 'next/navigation';

import { getCategories } from '@/services/dashboard/categories/dashboard.categories.service';
import { getProductByID } from '@/services/dashboard/products/dashboard.products.service';
import EditProduct from '@/template/editProduct/EditProduct';

type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardProductsId({ params: { id } }: Props) {
	const product = await getProductByID(id);
	const categories = await getCategories();
	if (!product || !categories) {
		return notFound();
	}
	return <EditProduct product={product} categories={categories} />;
}
