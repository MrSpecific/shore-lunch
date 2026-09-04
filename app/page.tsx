import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchSanityContent } from '@lib/sanity';
import loadContent from '@utils/loadContent';
import Content from '@components/layout/Content';
import EpisodeCard from '@components/EpisodeCard';
import { Page, Header } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import NavToggle from '@components/nav/NavToggle';
import SanityImage from '@components/SanityImage';
import { ShoreLunchLogoAlt } from '@svg';
import styles from '@styles/page/Home.module.css';

export const revalidate = 60; // REVALIDATE_SECONDS.home

export const metadata: Metadata = buildMetadata({ path: '/', pageTitle: null });

export default async function HomePage() {
  const [homePageData, latestEpisode] = await Promise.all([
    fetchSanityContent('homePageQuery'),
    fetchSanityContent('latestEpisodeQuery'),
  ]);
  const intro = await loadContent('homepageIntro');
  const { hero, heroMobile } = homePageData || {};

  return (
    <Page header={false}>
      <section className={styles.heroWrapper}>
        {hero?.image && (
          <SanityImage
            {...hero.image}
            asset={hero.image}
            alt={hero?.alt}
            className={heroMobile ? styles.heroImageDesktop : styles.heroImage}
            fill="true"
          />
        )}
        {heroMobile && (
          <SanityImage
            {...heroMobile}
            asset={heroMobile}
            alt={heroMobile?.alt}
            className={styles.heroImageMobile}
            fill="true"
          />
        )}
        <div className={styles.heroInner}>
          <ShoreLunchLogoAlt className={styles.heroLogo} />
        </div>
      </section>
      <div className={styles.mobileNavTop}>
        <NavToggle />
      </div>
      <Header className={styles.homePageHeader}>
        <span />
      </Header>
      <section className="content content-y">
        <div className={styles.introWrapper}>
          <h1>About Us</h1>
          {intro && <Content markdown={intro} className="body-copy-large" />}
        </div>
        {latestEpisode && (
          <section className={styles.latestEpisodeSection} aria-labelledby="latest-episode-heading">
            <div className={styles.latestEpisodeHeader}>
              <h2 id="latest-episode-heading">Latest Episode</h2>
              <Link href="/episodes" className={styles.latestEpisodeLink}>
                View all episodes
              </Link>
            </div>
            <div className={styles.latestEpisodeCard}>
              <EpisodeCard {...latestEpisode} label="new" />
            </div>
          </section>
        )}
      </section>
    </Page>
  );
}
