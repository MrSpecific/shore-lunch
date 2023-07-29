import EpisodeCard from '@components/EpisodeCard';
import styles from '@styles/components/EpisodeGrid.module.css';

const EpisodeGrid = ({ episodes }) => {
  if (!episodes) return null;

  // console.log(episodes);

  return (
    <section className={styles.episodeGrid}>
      {episodes.map((episode, index) => (
        <EpisodeCard key={episode._id} {...episode} label={index === 0 ? 'new' : null} />
      ))}
    </section>
  );
};

export default EpisodeGrid;
