import classNames from 'classnames';
import Image from 'next/image';
import { urlForImage } from '@lib/sanity';
import SanityImage from '@components/SanityImage';
import styles from '@styles/components/Hero.module.css';

const Hero = (props) => {
  const { className, asset, alt, caption } = props;

  if (!asset) return null;

  const HeroClass = classNames({
    [styles.hero]: asset,
    [className]: !!className,
  });

  return (
    <div className={HeroClass}>
      <div className={styles.imageWrapper}>
        {/* <Image src={source} className={styles.image} alt={alt || 'Hero image'} fill /> */}
        <SanityImage asset={asset} className={styles.image} alt={alt || 'Hero image'} fill />
      </div>
      {caption && <div className={classNames('caption content', styles.caption)}>{caption}</div>}
    </div>
  );
};

export default Hero;
