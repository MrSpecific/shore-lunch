import type { Metadata } from 'next';
import { Page } from '@layout';
import { fetchSanityContent } from '@lib/sanity';
import { buildMetadata } from '@lib/seo/metadata';
import EpisodeGrid from '@components/EpisodeGrid';
import styles from '@styles/page/Home.module.css';

export const revalidate = 60; // REVALIDATE_SECONDS.episodesList

export const metadata: Metadata = buildMetadata({ path: '/episodes', pageTitle: 'Episodes' });

export default async function EpisodesPage() {
  const episodes = await fetchSanityContent('allEpisodesQuery');

  return (
    <Page>
      <section className="content content-y">
        <div className={styles.introWrapper}>
          <h1>Episodes</h1>
          <EpisodeGrid episodes={episodes} />
        </div>
      </section>
    </Page>
  );
}
