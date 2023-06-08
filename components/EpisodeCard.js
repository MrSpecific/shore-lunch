import styles from '@styles/components/EpisodeCard.module.css';
import Link from 'next/link';

const EpisodeCard = ({ episodeNumber, title, slug, videoUrl, ...props }) => {
  // if (!episodes) return null;

  return (
    <div className={styles.episodeGrid}>
      <h3>
        No. {episodeNumber} | {title}
      </h3>
      <Link href={videoUrl} target="_blank" className="button">
        Watch now
      </Link>
      {/* {JSON.stringify(props, null, 2)} */}
    </div>
  );
};

export default EpisodeCard;
