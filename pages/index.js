/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';

import loadContent from '@utils/loadContent';
import Content from '@components/layout/Content';
import { Page, Header } from '@layout';
import styles from '@styles/page/Home.module.css';
import heroImage from '@images/IMG_2854.jpg';
import { CoffeeOutsideSticker } from '@svg';
// import { useAppContext } from '@context/app';

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
      <Header />
      <section className="content content-y">
        <div className={styles.introWrapper}>
          <h1>
            We&apos;re a loose collective of like-minded individuals that enjoy brewing coffee{' '}
            <span style={{ whiteSpace: 'nowrap' }}>al fresco.</span>
          </h1>
          {intro && <Content markdown={intro} className="body-copy-large" />}
        </div>
      </section>
    </Page>
  );
}

export async function getStaticProps() {
  const intro = await loadContent('homepageIntro');

  return { props: { intro } };
}
