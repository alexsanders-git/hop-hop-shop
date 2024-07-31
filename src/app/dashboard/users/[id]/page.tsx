type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardProductsId({ params: { id } }: Props) {
	return <div>user {id}</div>;
}
