import { PortableText } from '@portabletext/react';
import classNames from 'classnames';
import styles from '@styles/components/blocks/TextBlock.module.css';

const TextBlock = ({ className, overline, bodyCopy }) => {
  const textBlockClass = classNames({
    [styles.textBlock]: true,
    [styles.centered]: !overline,
    ['text-container']: true,
    [className]: !!className,
  });

  const copyClass = classNames({
    [styles.copy]: true,
    ['body-copy large centered']: !overline,
  });

  return (
    <div className={textBlockClass}>
      <div className={classNames(styles.textBlockWrapper)}>
        {overline && <div className={classNames(styles.overline, 'h3 overline')}>{overline}</div>}
        {bodyCopy && (
          <div className={copyClass}>
            <PortableText value={bodyCopy} />
          </div>
        )}
      </div>
    </div>
  );
};
export default TextBlock;
