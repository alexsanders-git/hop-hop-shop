import Link from 'next/link';

import TwitterIcon from '../../../public/footerImage/twitter.svg';
import FacebookIcon from '../../../public/footerImage/facebook.svg';
import InstagramIcon from '../../../public/footerImage/instagram.svg';
import PinterestIcon from '../../../public/footerImage/pinterest.svg';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './Footer.module.scss';
import CookiesPopUp from '../CookiesPopUp/CookiesPopUp';
import Logo from '../Logo/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <CookiesPopUp />
      <footer className={styles.footer}>
        <div className={styles.wrapper}>
          <Logo className={styles.logoWrapper} />
          <div className={styles.footer_left}>
            <p className={styles.text}>
              Life's too short for boring accessories, hop on board!
            </p>
            <div className={styles.social_icons}>
              <Link href="#" className={styles.iconsWrp}>
                <TwitterIcon className={styles.icon} />
              </Link>
              <Link href="#" className={styles.iconsWrp}>
                <FacebookIcon />
              </Link>
              <Link href="#" className={styles.iconsWrp}>
                <InstagramIcon />
              </Link>
              <Link href="#" className={styles.iconsWrp}>
                <PinterestIcon />
              </Link>
            </div>
          </div>

          <div className={styles.footer_right}>
            <ul className={`${robotoCondensed.className} ${styles.list}`}>
              <li>
                <Link href="#">About</Link>
              </li>
              <li>
                <Link href="#">Login</Link>
              </li>
              <li>
                <Link href="/terms-of-use">Terms of use</Link>
              </li>
            </ul>
            <ul className={`${robotoCondensed.className} ${styles.list}`}>
              <li>
                <Link href="#">Contact us</Link>
              </li>
              <li>
                <Link href="/cookies-policy">Сookies policy</Link>
              </li>
              <li>
                <Link href="#">Advertising placement</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={`${robotoCondensed.className} ${styles.copyright}`}>
          {' '}
          &#169; {currentYear} HopHopShop. All rights reserved. Don't mess with
          our stuff!
        </div>
      </footer>
    </>
  );
}
