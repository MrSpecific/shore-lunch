/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';

import loadContent from '@utils/loadContent';
import Content from '@components/layout/Content';
import { Page, Header } from '@layout';
import styles from '@styles/page/Home.module.css';
import heroImage from '@images/nate-p-casual-and-handsome.png';
import { ShoreLunchLogoAlt } from '@svg';
// import { useAppContext } from '@context/app';

const { log } = console;

export default function HomePage({ intro }) {
  const title = 'Shore Lunch';

  return (
    <Page title={title} header={false}>
      <section className={styles.heroWrapper}>
        <Image alt="Hero Image" src={heroImage} className={styles.heroImage} fill />
        <div className={styles.heroInner}>
          <ShoreLunchLogoAlt className={styles.heroLogo} />
        </div>
      </section>
      <Header className={styles.homePageHeader} />
      <section className="content content-y">
        <div className={styles.introWrapper}>
          <h1>About Us</h1>
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
