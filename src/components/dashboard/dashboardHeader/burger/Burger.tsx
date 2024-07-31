import { useState } from 'react';

import Ring from '@/assets/svg/ring.svg';
import NavbarLinks from '@/components/dashboard/dashboardHeader/navbarLinks/NavbarLinks';

import styles from './Burger.module.scss';
import BurgerIcon from '../../../../../public/headerImage/burger-menu.svg';
import CloseIcon from '../../../../../public/headerImage/close.svg';

function Burger() {
	const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState<boolean>(false);

	const toggleBurgerMenu = () => {
		setIsBurgerMenuOpen(!isBurgerMenuOpen);
	};
	return (
		<>
			<div className={styles.icons_mobile}>
				<button className={styles.icons_item} onClick={toggleBurgerMenu}>
					{isBurgerMenuOpen ? (
						<CloseIcon className={styles.closeIcon} />
					) : (
						<BurgerIcon className={styles.burgerIcon} />
					)}
				</button>
				<div className={styles.icons_item}>
					<Ring />
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
