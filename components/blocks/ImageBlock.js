import classNames from 'classnames';
import { urlForImage } from '@lib/sanity';
import SanityImage from '@components/SanityImage';
import styles from '@styles/components/blocks/ImageBlock.module.css';

const ImageBlock = ({ className, image }) => {
  if (!image) return null;

  const { caption } = image;

  return (
    <div className={styles.imageWrapper}>
      <SanityImage src={image} className={styles.image} />
      {caption && <div className={classNames(styles.caption, 'caption')}>{caption}</div>}
    </div>
  );
};
export default ImageBlock;
