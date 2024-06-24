import Image from 'next/image';

import SectionContainer from '@/components/SectionContainer/SectionContainer';
import ProductsSlider from '@/components/ProductsSlider/ProductsSlider';

import { getProducts } from '@/services/fetchData';

import styles from './NewArrivals.module.scss';

export default async function NewArrivals() {
  const products = await getProducts();

  return (
    <section className={styles.section}>
      <div className={styles.ribbonWrapper}>
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          src={'/ribbonArrivals.svg'}
          alt="img"
          className={styles.ribbon}
        />
      </div>

      <SectionContainer>
        <h2 className={styles.title}>New Arrivals</h2>

        <ProductsSlider products={products} />
      </SectionContainer>
    </section>
  );
}
