import classNames from 'classnames';
import { PortableText } from '@portabletext/react';
import YouTube from 'react-youtube';

import { fetchSanityContent } from '@lib/sanity';
import { Page } from '@layout';
import SanityImage from '@components/SanityImage';
// import Hero from '@components/Hero';
import NumberLockup from '@components/NumberLockup';
import parseYouTubeUrl from '@utils/parseYouTubeUrl';
import styles from './RecipePage.module.css';

export default function RecipePage({ data, ...props }) {
  const { description, title, image, instructions, ingredients } = data || {};

  const contentContainerClass = classNames({
    [styles.contentContainer]: true,
    ['content container']: true,
  });

  return (
    <Page title={title}>
      <div className={styles.dynamicPage}>
        <div className={contentContainerClass}>
          {image && (
            <SanityImage
              {...image}
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

export async function getStaticProps({ params }) {
  const page = await fetchSanityContent('recipeQuery', { slug: params.slug });

  return {
    props: {
      data: { ...page },
    },
  };
}

export async function getStaticPaths() {
  const paths = await fetchSanityContent('recipePathsQuery');

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}
