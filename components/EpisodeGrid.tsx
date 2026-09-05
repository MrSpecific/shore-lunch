import { EpisodeCard } from '@components/EpisodeCard';
import css from '@styles/components/EpisodeGrid.module.css';

export const EpisodeGrid = ({ episodes }) => {
  if (!episodes) return null;

  return (
    <section className={css.episodeGrid}>
      {episodes.map((episode, index) => (
        <EpisodeCard
          key={episode._id}
          {...episode}
          label={index === 0 ? 'new' : null}
          eagerLoad={index <= 4}
        />
      ))}
    </section>
  );
};
