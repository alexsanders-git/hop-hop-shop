type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardCategoriesId({ params: { id } }: Props) {
	return <div>create categories {id}</div>;
}
