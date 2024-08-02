'use client';

import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import { getDashboardSearch } from '@/services/dashboard/search/dashboard.search.service';
import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './DashboardSearchBar.module.scss';

interface IProps {
	className?: string;
	type: string;
}

function DashboardSearchBar(props: IProps) {
	const { className = '', type } = props;
	const [data, setData] = useState<IDashboardSearch[]>([]);
	const [query, setQuery] = useState('');
	const debouncedSearch = useDebounce(query.toLowerCase(), 500);
	const router = useRouter();
	const [open, setOpen] = useState<boolean>(false);

	const handleSuggestionClick = (id: number) => {
		router.push(`/dashboard/${type}/${id}`);
		setQuery('');
		setOpen(true);
	};

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await getDashboardSearch(type, debouncedSearch);
				if (res) {
					setData(res);
				}
			} catch (error) {
				console.error('error: ', error);
			}
		};

		if (debouncedSearch !== '') {
			fetchProduct();
		}
	}, [debouncedSearch, type]);

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

			{data.length > 0 && debouncedSearch.length > 0 && !open && (
				<div className={styles.suggestionsWrapper}>
					<div className={styles.suggestionsWrapperScrollBar}>
						<div className={styles.suggestionsContainer}>
							{data.map((suggestion, index) => (
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
		</div>
	);
}

export default DashboardSearchBar;
