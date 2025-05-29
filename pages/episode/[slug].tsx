import classNames from 'classnames';
import { PortableText } from '@portabletext/react';
import YouTube from 'react-youtube';

import { fetchSanityContent } from '@lib/sanity';
import { Page } from '@layout';
import SanityImage from '@components/SanityImage';
// import Hero from '@components/Hero';
import NumberLockup from '@components/NumberLockup';
import parseYouTubeUrl from '@utils/parseYouTubeUrl';
import styles from '@styles/page/EpisodePage.module.css';

export default function EpisodePage({ data, ...props }) {
  const { episodeNumber, description, title, cover, videoUrl } = data || {};

  const contentContainerClass = classNames({
    [styles.contentContainer]: true,
    ['content container']: true,
  });

  const handleOnReady = (event) => {
    console.log(event);
  };

  const videoOptions = {
    width: '1280',
    height: '780',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
    },
  };

  const { videoId } = parseYouTubeUrl(videoUrl);

  return (
    <Page title={title}>
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
          <YouTube
            videoId={videoId}
            opts={videoOptions}
            onReady={handleOnReady}
            // iframeClassName={styles.}
            className={styles.videoWrapper}
          />

          {description && (
            <section className={styles.episodeDescription}>
              <PortableText value={description} />
            </section>
          )}
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps({ params }) {
  const page = await fetchSanityContent('episodeQuery', { slug: params.slug });

  return {
    props: {
      data: { ...page },
    },
  };
}

export async function getStaticPaths() {
  const paths = await fetchSanityContent('episodePathsQuery');

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}
