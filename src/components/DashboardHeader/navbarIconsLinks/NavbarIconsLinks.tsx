'use client';

import styles from './navbarIconsLinks.module.scss';
import Logout from '../../../assets/svg/logaut.svg';
import Ring from '../../../assets/svg/ring.svg';

function NavbarIconsLinks() {
	return (
		<div className={styles.icons_list}>
			<div className={styles.icons_item}>
				<Ring />
			</div>
			<div className={styles.icons_item2}>
				<Logout />
			</div>
			<span className={styles.admin}>ADMIN</span>
		</div>
	);
}

export default NavbarIconsLinks;
