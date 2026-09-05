import type { Metadata } from 'next';
import classNames from 'classnames';
import { PortableText } from '@portabletext/react';

import { fetchSanityContent } from '@lib/sanity';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import SanityImage from '@components/SanityImage';
import styles from './RecipePage.module.css';

export const revalidate = 300; // REVALIDATE_SECONDS.recipeDetail

export async function generateStaticParams() {
  const paths = await fetchSanityContent('recipePathsQuery');
  return paths.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchSanityContent('recipeQuery', { slug });
  return buildMetadata({ path: `/recipe/${slug}`, pageTitle: data?.title });
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchSanityContent('recipeQuery', { slug });
  const { description, title, image, instructions, ingredients } = data || {};

  const contentContainerClass = classNames({
    [styles.contentContainer]: true,
    ['content container']: true,
  });

  return (
    <Page>
      <div className={styles.dynamicPage}>
        <div className={contentContainerClass}>
          {image && (image.id || image._ref) && (
            <SanityImage
              {...image}
              id={image?._id || image?._ref || image.alt || 'image'}
              width={2000}
              height={'auto'}
              style={{ margin: 'var(--spacer-m) 0' }}
              className={styles.recipeImage}
            />
          )}
          {title && <h1 className={styles.headline}>{title}</h1>}

          {description && <section className={styles.recipeDescription}>{description}</section>}

          <section className={styles.recipeMain}>
            {instructions && (
              <div className={styles.instructions}>
                <h2>Instructions</h2>
                <PortableText value={instructions} />
              </div>
            )}

            {ingredients && (
              <div className={styles.ingredients}>
                <h2>Ingredients</h2>
                <PortableText value={ingredients} />
              </div>
            )}
          </section>

          {data.preparationTime && (
            <section className={styles.preparationTime}>
              <h2>Preparation Time</h2>
              <p>{data.preparationTime}</p>
            </section>
          )}
          {data.cookingTime && (
            <section className={styles.cookingTime}>
              <h2>Cooking Time</h2>
              <p>{data.cookingTime}</p>
            </section>
          )}
          {data.servings && (
            <section className={styles.servings}>
              <h2>Servings</h2>
              <p>{data.servings}</p>
            </section>
          )}
        </div>
      </div>
    </Page>
  );
}
