'use client';

import { BellRing, LogOut } from 'lucide-react';

import styles from './navbarIconsLinks.module.scss';

function NavbarIconsLinks() {
	return (
		<div className={styles.icons_list}>
			<div className={styles.icons_item}>
				<BellRing />
			</div>
			<div className={styles.icons_item}>
				<LogOut />
			</div>
			<span className={styles.admin}>ADMIN</span>
		</div>
	);
}

export default NavbarIconsLinks;
