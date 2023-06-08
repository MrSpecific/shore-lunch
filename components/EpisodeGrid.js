import EpisodeCard from '@components/EpisodeCard';
import styles from '@styles/components/EpisodeGrid.module.css';

const EpisodeGrid = ({ episodes }) => {
  if (!episodes) return null;

  return (
    <section className={styles.episodeGrid}>
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} {...episode} />
      ))}
    </section>
  );
};

export default EpisodeGrid;
