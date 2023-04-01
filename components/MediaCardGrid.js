/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image';
import classNames from 'classnames';

import styles from '@styles/components/MediaCardGrid.module.css';

const MediaCard = ({ media, coverImage, buttonText }) => {
  if (!media) return null;

  return (
    <div className={styles.mediaCard}>
      {coverImage && (
        <Image
          data={coverImage.responsiveImage}
          layout="fill"
          objectFit="cover"
          objectPosition="50% 50%"
          className={styles.cardImage}
        />
      )}
      <a href={media.url} className={styles.mediaCardLink}>
        <span className={styles.mediaCardButton}>
          {buttonText || media.title || media.filename}
        </span>
      </a>
    </div>
  );
};

const MediaCardGrid = ({ cards }) => {
  if (!cards || !cards.length) return null;
  return (
    <div className="content">
      <section className={classNames([[styles.mediaCardGrid], 'container'])}>
        {cards.map((card) => (
          <MediaCard {...card} key={card.id} />
        ))}
      </section>
    </div>
  );
};

export default MediaCardGrid;
