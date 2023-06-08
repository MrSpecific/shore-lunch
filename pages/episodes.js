import { Page } from '@layout';
import { fetchSanityContent } from '@lib/sanity';
import EpisodeGrid from '@components/EpisodeGrid';
import styles from '@styles/page/Home.module.css';

const { log } = console;

export default function EpisodesPage({ episodes }) {
  const title = 'Episodes';

  return (
    <Page title={title}>
      <section className="content content-y">
        <div className={styles.introWrapper}>
          <h1>Episodes</h1>
          {/* {JSON.stringify(episodes, null, 2)} */}
          <EpisodeGrid episodes={episodes} />
        </div>
      </section>
    </Page>
  );
}

export async function getStaticProps() {
  // const episodes = await loadContent('homepageIntro');
  const episodes = await fetchSanityContent('allEpisodes');

  return {
    props: {
      episodes,
    },
  };
}
