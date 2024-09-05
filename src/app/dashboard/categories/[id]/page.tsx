import { notFound } from 'next/navigation';

import { getCategoryById } from '@/services/dashboard/categories/dashboard.categories.service';
import EditCategory from '@/template/editCategory/EditCategory';
import { isValid } from '@/utils/func/isValid';

type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardCategoriesId({ params: { id } }: Props) {
	const category = await getCategoryById(id);

	if (!isValid<ICategory>(category)) {
		return notFound();
	}
	return <EditCategory category={category} />;
}
