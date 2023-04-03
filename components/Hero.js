import classNames from 'classnames';
import Image from 'next/image';
import { urlForImage } from '@lib/sanity';
// import SanityImage from '@components/SanityImage';
import styles from '@styles/components/Hero.module.css';

const Hero = (props) => {
  const { className, asset, image, alt, caption, headline, cta } = props;
  // Decorated Hero has an image (and cta + headline)
  // Undecorated has an asset
  if (!asset && !image) return null;

  const source = urlForImage(asset || image)
    .auto('format')
    .fit('max')
    .width(1800)
    .url();

  const HeroClass = classNames({
    [styles.hero]: asset,
    [styles.decoratedHero]: image,
    [className]: !!className,
  });

  return (
    <div className={HeroClass}>
      <div className={styles.imageWrapper}>
        <Image src={source} className={styles.image} alt={alt || 'Hero image'} fill />
      </div>
      {caption && <div className={classNames('caption content', styles.caption)}>{caption}</div>}
    </div>
  );
};

export default Hero;
