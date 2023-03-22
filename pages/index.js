/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';

import loadContent from '@utils/loadContent';
import Content from '@components/layout/Content';
import CartItems from '@commerce/CartItems';
import { Page } from '@layout';
import styles from '@styles/page/Home.module.css';
import heroImage from '@images/IMG_2854.jpg';
import { CoffeeOutsideSticker } from '@svg';

const { log } = console;

export default function HomePage({ intro }) {
  const title = 'PDX Coffee Outside';

  return (
    <Page title={title} header={false}>
      <section className={styles.heroWrapper}>
        <Image alt="Hero Image" src={heroImage} className={styles.heroImage} fill />
        <div className={styles.heroInner}>
          <CoffeeOutsideSticker className={styles.heroLogo} />
        </div>
      </section>
      <section className="content content-y">
        <div className={styles.introWrapper}>
          <h1>{title}</h1>

          {intro && <Content markdown={intro} className={styles.introParagraph} />}
        </div>
      </section>

      <CartItems />
    </Page>
  );
}

export async function getStaticProps() {
  const intro = await loadContent('homepageIntro');

  return { props: { intro } };
}
