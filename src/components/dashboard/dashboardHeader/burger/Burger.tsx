import { BellRing, Menu, X } from 'lucide-react';
import { useState } from 'react';

import NavbarLinks from '@/components/dashboard/dashboardHeader/navbarLinks/NavbarLinks';

import styles from './Burger.module.scss';

function Burger() {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

	const toggleBurgerMenu = () => {
		setIsBurgerMenuOpen(!isBurgerMenuOpen);
	};
	return (
		<>
			<div className={styles.icons_mobile}>
				<button className={styles.icons_item} onClick={toggleBurgerMenu}>
					{isBurgerMenuOpen ? <X /> : <Menu />}
				</button>
				<div className={styles.icons_item}>
					<BellRing />
				</div>
			</div>
			<div
				className={`${styles.burgerMenu} ${isBurgerMenuOpen ? styles.burgerMenuOpen : ''}`}
			>
				<NavbarLinks />
			</div>
		</>
	);
}

export default Burger;
