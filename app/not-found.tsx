import classNames from 'classnames';
import type { Metadata } from 'next';
import { Page } from '@layout';
import { buildMetadata } from '@lib/seo/metadata';
import styles from '@styles/page/404.module.css';

export const metadata: Metadata = buildMetadata({ tags: { noIndex: true, noFollow: true }, path: '/404', pageTitle: '404' });

export default function NotFound() {
  return (
    <Page>
      <section className={classNames(styles.page, 'content container')}>
        <h1 className={styles.headline}>
          404 | <span className={styles.subtext}>Page Not Found</span>
        </h1>
      </section>
    </Page>
  );
}
