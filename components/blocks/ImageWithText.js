import { PortableText } from '@portabletext/react';
import classNames from 'classnames';
import { urlForImage } from '@lib/sanity';
import styles from '@styles/components/blocks/ImageWithText.module.css';

const ImageWithText = ({ className, overline, bodyCopy, image, alignment, link }) => {
  if (!bodyCopy || !image) return null;

  const { alt, caption } = image;

  const source = urlForImage(image).auto('format').fit('clip').width(1000).url();

  const imageWithTextClass = classNames({
    [styles.imageWithText]: true,
    [styles[alignment]]: true,
    ['container']: true,
    [className]: !!className,
  });

  return (
    <div className={imageWithTextClass}>
      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={source} className={styles.image} alt={alt} />
        {caption && <div className={classNames(styles.caption, 'caption')}>{caption}</div>}
      </div>
      <div className={styles.textWrapper}>
        {overline && <h2 className={classNames(styles.overline, 'h3')}>{overline}</h2>}
        <div className={classNames(styles.copy, 'body-copy large')}>
          <PortableText value={bodyCopy} />
        </div>
        {link?.url && link?.label && (
          <a href={link.url} className={classNames(styles.link, 'tertiary')}>
            {link.label}
          </a>
        )}
      </div>
    </div>
  );
};
export default ImageWithText;
