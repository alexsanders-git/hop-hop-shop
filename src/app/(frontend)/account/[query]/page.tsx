import type { Metadata } from 'next';

import AccountTemplate from '@/template/accountTemplate/AccountTemplate';

import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

type Props = {
	params: {
		query: string;
	};
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { query } = params;
	return {
		title: `${capitalizeFirstLetter(query)} - ${process.env.NEXT_PUBLIC_APP_NAME}`,
	};
}
export default async function AccountPage({ params: { query } }: Props) {
	return <AccountTemplate query={query} />;
}
