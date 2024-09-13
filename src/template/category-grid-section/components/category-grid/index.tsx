'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import useIsMobile from '@/hooks/useIsMobile';
import MobileCategoryGrid from '../mobile-category-grid';
import DesktopCategoryGrid from '../desktop-category-grid';

interface IProps {
	categories: ICategory[];
}

export default function CategoryGrid({ categories }: IProps) {
	const isMobile = useIsMobile(992);

	useEffect(() => {
		AOS.init();
	}, []);

	return (
		<>
			{isMobile ? (
				<MobileCategoryGrid categories={categories} />
			) : (
				<DesktopCategoryGrid categories={categories} />
			)}
		</>
	);
}
