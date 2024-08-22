import AccountTemplate from '@/template/accountTemplate/AccountTemplate';

type Props = {
	params: {
		query: string;
	};
};
export default async function AccountPage({ params: { query } }: Props) {
	console.log(query);
	return <AccountTemplate query={query} />;
}
