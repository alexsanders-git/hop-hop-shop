'use client';

import { useRouter } from 'next/navigation';
import { forwardRef, Ref, useEffect, useState } from 'react';

import { useDebounce } from '@/hooks/useDebounce';
import {
	fetchSearchData,
	ProductSearch,
} from '@/services/search/search.service';
import { robotoCondensed } from '@/styles/fonts/fonts';

import CloseIcon from './close.svg';
import styles from './DashboardSearchBar.module.scss';
import SearchIcon from './search.svg';

interface IProps {
	className?: string;
}

function DashboardSearchBar(props: IProps) {
	const { className = '' } = props;
	const [data, setData] = useState<ProductSearch[]>([]);
	const [query, setQuery] = useState('');
	const debouncedSearch = useDebounce(query.toLowerCase(), 500);
	const router = useRouter();
	const [open, setOpen] = useState<boolean>(false);

	const handleSuggestionClick = (id: number) => {
		router.push(`/product/${id}`);
		setQuery('');
		setOpen(true);
	};

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const productData = await fetchSearchData(debouncedSearch);
				if (productData) {
					setData(productData);
				}
			} catch (error) {
				console.error('error: ', error);
			}
		};

		if (debouncedSearch !== '') {
			fetchProduct();
		}
	}, [debouncedSearch]);

	return (
		<div className={`${styles.searchContainer} ${className}`}>
			{query && (
				<>
					<button className={styles.searchButton}>
						<SearchIcon />
					</button>
					<button
						className={styles.closeButton}
						onClick={() => {
							setOpen(true);
							setQuery('');
						}}
					>
						<CloseIcon />
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
			)}
		</div>
	);
}

export default DashboardSearchBar;
