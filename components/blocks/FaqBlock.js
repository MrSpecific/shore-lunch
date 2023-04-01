import { PortableText } from '@portabletext/react';
import classNames from 'classnames';
import styles from '@styles/components/blocks/FaqBlock.module.css';
import { ChevronRight } from '@components/svg';

const FaqBlock = ({ faqItems }) => {
  if (!faqItems || !faqItems.length) return null;

  const faqItem = faqItems.map(({ question, answer, _key }) => {
    return (
      <li key={_key} className={classNames(styles.item)}>
        <details className={styles.accordion}>
          <summary className={styles.questionWrapper}>
            <div className={classNames(styles.question, 'h6')}>{question}</div>
            <div className={styles.chevronIcon}>
              <ChevronRight />
            </div>
          </summary>
          <div className={classNames(styles.answer, 'body-copy')}>
            <PortableText value={answer} />
          </div>
        </details>
      </li>
    );
  });

  return (
    <section className="text-container">
      <div className={classNames(styles.faqBlock)}>
        <ul className={styles.list}>{faqItem}</ul>
      </div>
    </section>
  );
};

export default FaqBlock;
