import { fetchSanityContent } from '@lib/sanity';
import loadContent from '@utils/loadContent';
import Content from '@components/layout/Content';
import EpisodeCard from '@components/EpisodeCard';
import { Page, Header } from '@layout';
import styles from '@styles/page/Home.module.css';
import heroImage from '@images/nate-p-casual-and-handsome.png';
import { ShoreLunchLogoAlt } from '@svg';
import SanityImage from '@components/SanityImage';
import Link from 'next/link';
import NavToggle from '@components/nav/NavToggle';
import { REVALIDATE_SECONDS } from '@lib/revalidation';
// import { useAppContext } from '@context/app';

const { log } = console;

export default function HomePage({ intro, hero, heroMobile, latestEpisode, ...props }) {
  const title = 'Shore Lunch';

  return (
    <Page title={title} header={false}>
      <section className={styles.heroWrapper}>
        {hero?.image && (
          <SanityImage
            {...hero.image}
            asset={hero.image}
            alt={hero?.alt}
            className={!!heroMobile ? styles.heroImageDesktop : styles.heroImage}
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
        {/* <Image alt="Hero Image" src={heroImage} className={styles.heroImage} fill /> */}
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

export async function getStaticProps() {
  const [homePageData, latestEpisode] = await Promise.all([
    fetchSanityContent('homePageQuery'),
    fetchSanityContent('latestEpisodeQuery'),
  ]);
  const intro = await loadContent('homepageIntro');

  return {
    props: {
      intro,
      latestEpisode: latestEpisode || null,
      ...homePageData,
    },
    revalidate: REVALIDATE_SECONDS.home,
  };
}
