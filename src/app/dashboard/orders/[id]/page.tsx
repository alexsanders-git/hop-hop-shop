type Props = {
	params: {
		id: string;
	};
};

export default async function DashboardOrderEdit({ params: { id } }: Props) {
	return <div>edit order {id}</div>;
}
