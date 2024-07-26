type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardProductsId({ params: { id } }: Props) {
	return <div>create DashboardProductsId {id}</div>;
}
