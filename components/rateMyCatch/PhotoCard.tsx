import Image from 'next/image';
import Link from 'next/link';
import StarRating from './StarRating';
import type { PhotoWithStats } from '@lib/rateMyCatch';
import styles from '@styles/components/PhotoCard.module.css';

const PhotoCard = ({ photo }: { photo: PhotoWithStats }) => {
  return (
    <Link href={`/rate-my-catch/${photo.id}`} className={styles.photoCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={photo.imageUrl}
          alt={photo.caption || `Catch photo by ${photo.authorName}`}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.cardBody}>
        {photo.caption && <p className={styles.caption}>{photo.caption}</p>}
        <div className={styles.meta}>
          <span className={styles.author}>{photo.authorName}</span>
          <StarRating value={photo.averageRating} readOnly size="small" />
        </div>
        <p className={styles.stats}>
          {photo.ratingCount} rating{photo.ratingCount === 1 ? '' : 's'} · {photo.commentCount} comment
          {photo.commentCount === 1 ? '' : 's'}
        </p>
      </div>
    </Link>
  );
};

export default PhotoCard;
