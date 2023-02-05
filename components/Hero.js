/* eslint-disable jsx-a11y/alt-text */
import Link from 'next/link';
import { Image } from 'react-datocms';
import classNames from 'classnames';

import { useAppContext } from '@lib/context/app';
import FlagIcon from './svg/flag.svg';
import styles from '@styles/components/Hero.module.css';

export const Overline = ({ text }) => {
  if (!text) return null;
  return <span className="overline">{text}</span>;
};

const LocationTitle = ({ location }) => {
  if (!location) return null;
  return (
    <span className={styles.locationTitle}>
      <FlagIcon className={styles.flagIcon} /> {location.title}
    </span>
  );
};

const CtaLink = ({ cta }) => {
  if (!cta || !cta.url || !cta.label) return null;

  return (
    <Link href={cta.url} className="button secondary">
      {cta.label}
    </Link>
  );
};

const HeroImageAttribution = ({ attribution, attributionLink }) => {
  if (!attribution) return null;

  const inner = attributionLink ? <Link href={attributionLink}>{attribution}</Link> : attribution;
  return <div className={styles.imageAttribution}>{inner}</div>;
};

const Hero = (props) => {
  const { image, headline, paragraph, cta, className, imageAttribution, imageAttributionLink } =
    props;
  let { overline } = props;
  const heroClass = classNames([styles.hero, { [className]: !!className }]);

  return (
    <section className={styles.heroWrapper}>
      <div className={heroClass}>
        {image && (
          <Image
            data={image.responsiveImage}
            className={styles.heroImage}
            fadeInDuration={400}
            lazyLoad={true}
          />
        )}
        <div className={styles.heroContent}>
          <div className={styles.heroContentInner}>
            <Overline text={overline} />
            {headline && <h1>{headline}</h1>}
            {paragraph && <div className={styles.heroParagraph}>{paragraph}</div>}
            <CtaLink cta={cta} />
          </div>
        </div>
      </div>
      <HeroImageAttribution attribution={imageAttribution} attributionLink={imageAttributionLink} />
    </section>
  );
};

export default Hero;
