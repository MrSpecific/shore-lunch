import { Page } from '@layout';
import styles from '@styles/page/Home.module.css';

const { log } = console;

export default function HomePage({ intro, hero, ...props }) {
  const title = 'Shore Lunch';

  return (
    <Page title={title}>
      <section className="content content-y">
        <div className={styles.introWrapper}>
          <h1>Episodes</h1>
        </div>
      </section>
    </Page>
  );
}

export async function getStaticProps() {
  // const episodes = await loadContent('homepageIntro');

  return {
    props: {
      // intro,
      // ...homePageData,
    },
  };
}
