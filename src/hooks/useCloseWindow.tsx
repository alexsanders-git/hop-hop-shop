import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useUnsavedChanges = (shouldBlockNavigation: boolean) => {
	const router = useRouter();
	const [isModalVisible, setModalVisible] = useState(false);
	const [nextPath, setNextPath] = useState<string | null>(null);

	// Використовуємо useEffect для перехоплення навігації
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (shouldBlockNavigation) {
				e.preventDefault();
				e.returnValue = ''; // Стандартне повідомлення браузера
			}
		};

		const handleRouteChange = (url: string) => {
			if (shouldBlockNavigation) {
				setNextPath(url); // Запам'ятовуємо куди юзер хоче перейти
				setModalVisible(true); // Показуємо попап
				router.replace(window.location.pathname); // Залишаємо користувача на поточній сторінці
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [shouldBlockNavigation, router]);

	const confirmNavigation = () => {
		setModalVisible(false);
		if (nextPath) {
			router.push(nextPath); // Переходимо на нову сторінку після підтвердження
		}
	};

	const cancelNavigation = () => {
		setModalVisible(false);
		setNextPath(null); // Скидаємо маршрут
	};

	return {
		isModalVisible,
		confirmNavigation,
		cancelNavigation,
	};
};
