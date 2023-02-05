import Link from 'next/link';
import classNames from 'classnames';

import styles from '@styles/components/QuoteBlock.module.css';

const QuoteBlock = ({ quote, attribution, cta }) => {
  if (!quote) return null;

  return (
    <section className={styles.quoteBlock}>
      <blockquote className={styles.quote}>
        <attribution className={classNames(['overline', [styles.attribution]])}>
          {attribution}
        </attribution>
        <div className={classNames(['h2', [styles.quote]])}>{quote}</div>
        {cta && (
          <Link href={cta.url} className="button">
            {cta.label}
          </Link>
        )}
      </blockquote>
    </section>
  );
};

export default QuoteBlock;
