'use client';

import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { useFetchAuth } from '@/hooks/useFetchAuth';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './DashboardSearchBar.module.scss';

interface IProps {
	className?: string;
	type: string;
}

function DashboardSearchBar(props: IProps) {
	const { className = '', type } = props;
	const [query, setQuery] = useState('');
	const debouncedSearch = useDebounce(query.toLowerCase(), 500);
	const router = useRouter();
	const [open, setOpen] = useState<boolean>(false);

	const { data } = useFetchAuth<IDashboardSearch>({
		endpoint: `shop/${type}/?name=${debouncedSearch}`,
		skip: debouncedSearch === '',
		options: {
			method: 'GET',
		},
	});

	const handleSuggestionClick = (id: number) => {
		router.push(`/dashboard/${type}/${id}`);
		setQuery('');
		setOpen(true);
	};

	return (
		<div className={`${styles.searchContainer} ${className}`}>
			{query && (
				<>
					<button className={styles.searchButton}>
						<Search />
					</button>
					<button
						className={styles.closeButton}
						onClick={() => {
							setOpen(true);
							setQuery('');
						}}
					>
						<X />
					</button>
				</>
			)}
			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				className={`${styles.searchInput} ${robotoCondensed.className} ${query ? styles.searchInputWithQuery : ''}`}
				placeholder="Search"
			/>
			{/*eslint-disable*/}
			{data &&
				data?.items?.length > 0 &&
				debouncedSearch.length > 0 &&
				!open && (
					<div className={styles.suggestionsWrapper}>
						<div className={styles.suggestionsWrapperScrollBar}>
							<div className={styles.suggestionsContainer}>
								{data.items.map((suggestion, index) => (
									<div
										key={index}
										className={styles.suggestionItem}
										onClick={() => handleSuggestionClick(suggestion.id)}
									>
										{suggestion.name}
									</div>
								))}
							</div>
						</div>
					</div>
				)}
			{/*	eslint-enable*/}
		</div>
	);
}

export default DashboardSearchBar;
