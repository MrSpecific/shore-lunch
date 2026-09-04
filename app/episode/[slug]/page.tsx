import type { Metadata } from 'next';
import classNames from 'classnames';
import { PortableText } from '@portabletext/react';

import { fetchSanityContent } from '@lib/sanity';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import SanityImage from '@components/SanityImage';
import NumberLockup from '@components/NumberLockup';
import parseYouTubeUrl from '@utils/parseYouTubeUrl';
import YouTubeEmbed from './YouTubeEmbed';
import styles from './EpisodePage.module.css';

export const revalidate = 300; // REVALIDATE_SECONDS.episodeDetail

export async function generateStaticParams() {
  const paths = await fetchSanityContent('episodePathsQuery');
  return paths.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchSanityContent('episodeQuery', { slug });

  return buildMetadata({ path: `/episode/${slug}`, pageTitle: data?.title });
}

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchSanityContent('episodeQuery', { slug });
  const { episodeNumber, description, title, cover, videoUrl, recipes } = data || {};

  const contentContainerClass = classNames({
    [styles.contentContainer]: true,
    ['content container']: true,
  });

  const { videoId } = parseYouTubeUrl(videoUrl);

  return (
    <Page>
      <div className={styles.dynamicPage}>
        {cover && (
          <SanityImage
            {...cover}
            width={2000}
            height={'auto'}
            style={{ margin: 'var(--spacer-m) 0' }}
          />
        )}
        <div className={contentContainerClass}>
          <NumberLockup
            episodeNumber={episodeNumber}
            style={{ fontSize: '3em', textAlign: 'center' }}
          />
          {title && <h1 className={styles.headline}>{title}</h1>}
          <YouTubeEmbed videoId={videoId} className={styles.videoWrapper} />

          {description && (
            <section className={styles.episodeDescription}>
              <PortableText value={description} />
            </section>
          )}

          {recipes && recipes.length > 0 && (
            <section className={styles.recipes}>
              <h2>Cook the episode:</h2>
              <ul className={styles.recipeList}>
                {recipes.map((recipe: any) => (
                  <li key={recipe._id} className={styles.recipeItem}>
                    <a href={`/recipe/${recipe.slug.current}`} className={styles.recipeLink}>
                      <span className={styles.recipeTitle}>{recipe.title}</span>
                      {recipe.description && (
                        <span className={styles.recipeDescription}>{recipe.description}</span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </Page>
  );
}
