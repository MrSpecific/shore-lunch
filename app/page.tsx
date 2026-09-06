import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchSanityContent } from '@lib/sanity';
import { loadContent } from '@utils/loadContent';
import { Content } from '@components/layout/Content';
import { EpisodeCard } from '@components/EpisodeCard';
import { Page, Header } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import { NavToggle } from '@components/nav/NavToggle';
import { SanityImage } from '@components/SanityImage';
import { ShoreLunchLogoAlt } from '@svg';
import { listPhotosPage } from '@lib/rateMyCatch';
import PhotoCard from '@components/rateMyCatch/PhotoCard';
import css from './Home.module.css';

export const revalidate = 60; // REVALIDATE_SECONDS.home

export const metadata: Metadata = buildMetadata({ path: '/', pageTitle: null });

export default async function HomePage() {
  const [homePageData, latestEpisode, latestCatchPage] = await Promise.all([
    fetchSanityContent('homePageQuery'),
    fetchSanityContent('latestEpisodeQuery'),
    listPhotosPage({ limit: 1 }),
  ]);
  const intro = await loadContent('homepageIntro');
  const { hero, heroMobile } = homePageData || {};
  const latestCatch = latestCatchPage.photos[0] ?? null;

  return (
    <Page header={false}>
      <section className={css.heroWrapper}>
        {hero?.image && (
          <SanityImage
            {...hero.image}
            asset={hero.image}
            alt={hero?.alt}
            className={heroMobile ? css.heroImageDesktop : css.heroImage}
            fill="true"
          />
        )}
        {heroMobile && (
          <SanityImage
            {...heroMobile}
            asset={heroMobile}
            alt={heroMobile?.alt}
            className={css.heroImageMobile}
            fill="true"
          />
        )}
        <div className={css.heroInner}>
          <ShoreLunchLogoAlt className={css.heroLogo} />
          {/* <Button */}
        </div>
      </section>
      <div className={css.mobileNavTop}>
        <NavToggle />
      </div>
      <Header className={css.homePageHeader}>
        <span />
      </Header>
      <section className="content content-y">
        <div className={css.introWrapper}>
          <h1>About Us</h1>
          {intro && <Content markdown={intro} className="body-copy-large" />}
        </div>
        <section className={css.lastestSection}>
          {latestEpisode && (
            <div className={css.latestEpisodeSection} aria-labelledby="latest-episode-heading">
              <div className={css.latestEpisodeHeader}>
                <h2 id="latest-episode-heading">Latest Episode</h2>
                <Link href="/episodes" className={css.latestEpisodeLink}>
                  View all episodes
                </Link>
              </div>
              <div className={css.latestEpisodeCard}>
                <EpisodeCard {...latestEpisode} label="new" />
              </div>
            </div>
          )}

          {latestCatch && (
            <div className={css.latestCatchSection} aria-labelledby="latest-catch-heading">
              <div className={css.latestEpisodeHeader}>
                <h2 id="latest-catch-heading">Latest Catch</h2>
                <Link href="/rate-my-catch" className={css.latestEpisodeLink}>
                  View all catches
                </Link>
              </div>
              <PhotoCard photo={latestCatch} />
            </div>
          )}
        </section>
      </section>
    </Page>
  );
}
