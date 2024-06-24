import Image from 'next/image';

import SectionContainer from '@/components/SectionContainer/SectionContainer';
import ButtonLink from '@/components/ButtonLink/ButtonLink';

import { robotoCondensed } from '@/styles/fonts/fonts';

import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <div className={styles.section}>
      <SectionContainer>
        <div className={styles.heroWrapper}>
          <div className={styles.textWrapper}>
            <h1 className={styles.h1}>Hop into Style with</h1>

            <div className={styles.logoWrapperDesktop}>
              <Image width={340} height={180} src="/logo.svg" alt="Logo" />
            </div>

            <div className={styles.logoWrapperMobile}>
              <Image
                width={212}
                height={212}
                src="/logoMobile.svg"
                alt="Logo"
              />
            </div>

            <h2 className={styles.h2}>
              Where Every Hop Counts for Cool EDC Gear!
            </h2>

            <p className={`${robotoCondensed.className} ${styles.p}`}>
              Discover a curated collection of stylish and practical gear to
              jazz up your daily carry.
            </p>

            <p className={`${robotoCondensed.className} ${styles.p}`}>
              From pocket knives to gadgets, we've got everything you need to
              make your everyday routine fun and fabulous!
            </p>

            <div className={styles.imgMobile}>
              <Image
                layout="responsive"
                width={366}
                height={232}
                src="/manFromHeroSectionMobile.svg"
                alt="image"
              />

              <ButtonLink href="#category" text="Product" />
            </div>
          </div>

          <div className={styles.imgDesktop}>
            <Image
              layout="cover"
              width={513}
              height={714}
              src="/manFromHeroSection.svg"
              alt="image"
            />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
