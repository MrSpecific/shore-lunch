import { PortableText } from '@portabletext/react';
import classNames from 'classnames';
import { urlForImage } from '@lib/sanity';
import styles from '@styles/components/blocks/ImageBlock.module.css';

const ImageBlock = ({ className, image }) => {
  if (!image) return null;

  const { alt, caption } = image;

  const source = urlForImage(image).auto('format').fit('clip').width(1400).url();

  return (
    <div className={styles.imageWrapper}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={source} className={styles.image} alt={alt} />
      {caption && <div className={classNames(styles.caption, 'caption')}>{caption}</div>}
    </div>
  );
};
export default ImageBlock;
