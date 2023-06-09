import EpisodeCard from '@components/EpisodeCard';
import styles from '@styles/components/EpisodeGrid.module.css';

const EpisodeGrid = ({ episodes }) => {
  if (!episodes) return null;

  console.log(episodes);

  return (
    <section className={styles.episodeGrid}>
      {episodes.map((episode) => (
        <EpisodeCard key={episode._id} {...episode} />
      ))}
    </section>
  );
};

export default EpisodeGrid;
