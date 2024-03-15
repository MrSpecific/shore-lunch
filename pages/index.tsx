import { fetchSanityContent } from '@lib/sanity';
import loadContent from '@utils/loadContent';
import Content from '@components/layout/Content';
import { Page, Header } from '@layout';
import styles from '@styles/page/Home.module.css';
import heroImage from '@images/nate-p-casual-and-handsome.png';
import { ShoreLunchLogoAlt } from '@svg';
import SanityImage from '@components/SanityImage';
import NavToggle from '@components/nav/NavToggle';
// import { useAppContext } from '@context/app';

const { log } = console;

export default function HomePage({ intro, hero, heroMobile, ...props }) {
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
      </section>
    </Page>
  );
}

export async function getStaticProps() {
  const homePageData = await fetchSanityContent('homePageQuery');
  const intro = await loadContent('homepageIntro');

  return {
    props: {
      intro,
      ...homePageData,
    },
  };
}
