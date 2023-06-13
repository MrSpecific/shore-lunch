import Image from 'next/image';
import Link from 'next/link';
import SanityImage from '@components/SanityImage';
import NumberLockup from '@components/NumberLockup';
import parseYouTubeUrl from '@utils/parseYouTubeUrl';
import styles from '@styles/components/EpisodeCard.module.css';

const EpisodeCover = ({ cover, videoUrl }) => {
  const { videoId } = parseYouTubeUrl(videoUrl);
  //https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg

  return cover ? (
    <SanityImage {...cover} height={'auto'} />
  ) : (
    <Image
      src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
      alt=""
      width="1280"
      height="720"
      style={{ height: 'auto' }}
    />
  );
};

const EpisodeCard = ({ episodeNumber, title, slug, videoUrl, cover, ...props }) => {
  // if (!episodes) return null;

  // console.log(cover);

  return (
    <div className={styles.episodeCard}>
      <Link href={`/episode/${slug}`} tabIndex={-1} aria-hidden="true">
        <EpisodeCover cover={cover} videoUrl={videoUrl} slug={slug} />
      </Link>
      <h3>
        <NumberLockup episodeNumber={episodeNumber} style={{ fontSize: '1em' }} />
        <Link href={`/episode/${slug}`} style={{ textDecoration: 'none' }}>
          {title}
        </Link>
      </h3>
      <Link href={videoUrl} target="_blank" className="button">
        Watch now
      </Link>
      <Link href={videoUrl} target="_blank" className="button">
        YouTube
      </Link>
    </div>
  );
};

export default EpisodeCard;
