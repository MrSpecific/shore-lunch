import Image from 'next/image';
import Link from 'next/link';
import SanityImage from '@components/SanityImage';
import NumberLockup from '@components/NumberLockup';
import { YouTubeIcon, NewSticker } from '@svg';
import parseYouTubeUrl from '@utils/parseYouTubeUrl';
import styles from '@styles/components/EpisodeCard.module.css';

export const EpisodeCover = ({ cover, videoUrl, eagerLoad }) => {
  const { videoId } = parseYouTubeUrl(videoUrl);
  //https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg

  return cover ? (
    <SanityImage
      {...cover}
      height={'auto'}
      className={styles.coverImage}
      loading={eagerLoad ? 'eager' : 'lazy'}
    />
  ) : (
    <Image
      src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
      alt=""
      width="1280"
      height="720"
      style={{ height: 'auto' }}
      className={styles.coverImage}
    />
  );
};

export const EpisodeCard = ({
  episodeNumber,
  title,
  slug,
  videoUrl,
  cover,
  label,
  eagerLoad,
  ...props
}: {
  episodeNumber: number;
  title: string;
  slug: string;
  videoUrl: string;
  cover?: any;
  label?: string;
  eagerLoad?: boolean;
  [key: string]: any;
}) => {
  // if (!episodes) return null;

  // console.log(cover);

  return (
    <div className={styles.episodeCard}>
      <Link
        href={`/episode/${slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className={styles.coverWrapper}
      >
        <>
          <EpisodeCover cover={cover} videoUrl={videoUrl} eagerLoad={eagerLoad} />
          {label === 'new' && (
            <span className={styles.newLabel}>
              <NewSticker />
              <span className="visually-hidden">New</span>
            </span>
          )}
        </>
      </Link>
      <h3>
        <NumberLockup episodeNumber={episodeNumber} style={{ fontSize: '1em' }} />
        <Link href={`/episode/${slug}`} style={{ textDecoration: 'none' }}>
          {title}
        </Link>
      </h3>
      <div className={styles.cardActions}>
        <Link href={`/episode/${slug}`} className="button">
          Watch now
        </Link>
        <Link href={videoUrl} target="_blank" className={styles.offsiteButton}>
          <span className="visually-hidden">Watch on YouTube</span>
          <YouTubeIcon className={styles.buttonIcon} />
        </Link>
      </div>
    </div>
  );
};

export default EpisodeCard;
