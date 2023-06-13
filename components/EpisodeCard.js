import Link from 'next/link';
import SanityImage from '@components/SanityImage';
import NumberLockup from '@components/NumberLockup';
import styles from '@styles/components/EpisodeCard.module.css';

const EpisodeCard = ({ episodeNumber, title, slug, videoUrl, cover, ...props }) => {
  // if (!episodes) return null;

  // console.log(cover);

  return (
    <div className={styles.episodeCard}>
      {cover && <SanityImage {...cover} height={'auto'} />}
      <h3>
        <NumberLockup episodeNumber={episodeNumber} style={{ fontSize: '1em' }} />
        <Link href={`/episode/${slug}`} style={{ textDecoration: 'none' }}>
          {title}
        </Link>
      </h3>
      <Link href={videoUrl} target="_blank" className="button">
        Watch now
      </Link>
    </div>
  );
};

export default EpisodeCard;
