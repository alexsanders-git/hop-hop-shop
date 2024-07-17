import {
	DOTS,
	usePagination,
} from '@/components/dashboard/pagination/usePagination';

import styles from './styles.module.scss';
import Arrow from '../../../assets/svg/paginationArrow.svg';

export interface InterfacePagination {
	onPageChange: (page: number) => void;
	totalCount: number;
	siblingCount?: number;
	currentPage: number;
	pageSize: number;
	className?: string;
}

export default function Pagination(props: InterfacePagination) {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,
		className = '',
	} = props;
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || paginationRange!.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange![paginationRange!.length - 1];
	return (
		<ul className={`${styles.paginationContainer}  ${className}`}>
			<li
				className={`${styles.paginationItem}  ${currentPage === 1 && styles.disabled}`}
				onClick={onPrevious}
			>
				<Arrow className={`${styles.arrow}  ${styles.arrowLeft}`} />
			</li>
			{paginationRange!.map((pageNumber, index) => {
				if (pageNumber === DOTS) {
					return (
						<li
							key={index}
							className={`${styles.paginationItem}  ${styles.dots}`}
						>
							&#8230;
						</li>
					);
				}

				return (
					<li
						key={index}
						className={`${styles.paginationItem}  ${pageNumber === currentPage && styles.selected}`}
						onClick={() => onPageChange(pageNumber as number)}
					>
						{pageNumber}
					</li>
				);
			})}
			<li
				className={`${styles.paginationItem}  ${currentPage === lastPage && styles.disabled}`}
				onClick={onNext}
			>
				<Arrow className={`${styles.arrow}  ${styles.arrowRight}`} />
			</li>
		</ul>
	);
}
