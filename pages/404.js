import classNames from 'classnames';
import { Page } from '@layout';
import styles from '@styles/page/404.module.css';

const { log } = console;

export default function FourOhFour({}) {
  const title = '404';
  return (
    <Page title={title}>
      <section className={classNames(styles.page, 'content container')}>
        <h1 className={styles.headline}>
          404 | <span className={styles.subtext}>Page Not Found</span>
        </h1>
      </section>
    </Page>
  );
}

export async function getStaticProps() {
  return { props: {} };
}
