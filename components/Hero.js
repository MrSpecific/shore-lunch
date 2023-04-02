import classNames from 'classnames';
import { urlForImage } from '@lib/sanity';
// import SanityImage from '@components/SanityImage';
import { SiteLogo } from '@components/svg';
import styles from '@styles/components/Hero.module.css';

const HeroDecorations = ({ headline, cta }) => {
  if (!headline && !cta) return null;

  return (
    <div className={classNames(styles.decorations, 'content')}>
      <div className={styles.decorationsInner}>
        <SiteLogo className={styles.logo} />
        <div className={classNames(styles.headline, 'body-copy--mono')}>{headline}</div>
      </div>
    </div>
  );
};

const Hero = (props) => {
  // console.log(props);
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
        {/* Asset: {JSON.stringify(asset)}
        {imageBuilder.image(asset).url()}
        <hr></hr>
        Image: {JSON.stringify(image)} */}
        {/* <SanityImage src={asset || image} alt={alt || ''} fill /> */}
        <img src={source} className={styles.image} alt={alt || 'Hero image'} />
        {/* {image && <HeroDecorations headline={headline} cta={cta} />} */}
      </div>
      {caption && <div className={classNames('caption content', styles.caption)}>{caption}</div>}
    </div>
  );
};

export default Hero;
