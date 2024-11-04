'use client';
import { useEffect, useState } from 'react';

export default function useScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);
	const [canShow, setCanShow] = useState(true);

	useEffect(() => {
		const scrollThreshold = 200; // Minimum scroll value at which the button becomes visible

		// Function for switching the button visibility depending on the scroll position
		const toggleVisibility = () => {
			if (window.scrollY > scrollThreshold && canShow) {
				setIsVisible(true);
			} else if (isVisible) {
				setIsVisible(false);
				setCanShow(false);

				setTimeout(() => setCanShow(true), 500);
			}
		};

		// Add a scroll event listener
		window.addEventListener('scroll', toggleVisibility);

		// Remove the event listener when unmounting a component
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, [isVisible, canShow]);

	// Function for smooth scrolling up the page
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	};

	return { isVisible, scrollToTop };
}
