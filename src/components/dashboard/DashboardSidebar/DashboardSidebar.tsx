'use client';
import Link from 'next/link';

import { sidebarLinks } from '@/utils/linksData/linksData';

import styles from './styles.module.scss';

export default function DashboardSidebar() {
	return (
		<aside className={styles.sidebar}>
			<ul>
				{sidebarLinks.map((link, index) => (
					<li key={index}>
						<Link href={link.path}>{link.name}</Link>
					</li>
				))}
			</ul>
		</aside>
	);
}
