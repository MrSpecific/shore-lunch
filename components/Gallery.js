/* eslint-disable jsx-a11y/alt-text */
import classNames from 'classnames';
import Image from 'next/image';

import styles from '@styles/components/Gallery.module.css';

const Gallery = (props) => {
  const images = [];
  for (const image in props) {
    images.push(props[image].responsiveImage);
  }

  return (
    <div className={styles.galleryWrapper}>
      {images.map((img, i) => (
        <div key={i}>
          <Image data={img} alt={img.title} className={styles.galleryImage} />
          <div className={classNames('body-copy', styles.galleryTitle)}> {img.title} </div>
        </div>
      ))}
    </div>
  );
};
export default Gallery;
