/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';

import loadContent from '@utils/loadContent';
import Content from '@components/layout/Content';
import { Page } from '@layout';
import styles from '@styles/page/Home.module.css';
import heroImage from '@images/luca-bravo-ESkw2ayO2As-unsplash.jpeg';

const { log } = console;

export default function HomePage({ intro }) {
  const title = 'PDX Coffee Outside';

  return (
    <Page title={title} headerClass="header-overlay">
      <div className={styles.heroWrapper}>
        <Image alt="Hero Image" src={heroImage} className={styles.heroImage} />
      </div>
      {intro && (
        <section className="content content-y">
          <div className={styles.introWrapper}>
            <h1>
              {title}
              <br />
              <span className="h2">{intro.meta.title}</span>
            </h1>

            <Content markdown={intro} className={styles.introParagraph} />
          </div>
        </section>
      )}
    </Page>
  );
}

export async function getStaticProps() {
  const intro = await loadContent('homepageIntro');

  return { props: { intro } };
}
