import { PortableText } from '@portabletext/react';
import classNames from 'classnames';
import styles from '@styles/components/blocks/TextBlock.module.css';

const TextBlock = ({ className, overline, bodyCopy }) => {
  const textBlockClass = classNames({
    [styles.textBlock]: true,
    ['text-container']: true,
    [className]: !!className,
  });

  return (
    <div className={textBlockClass}>
      <div className={classNames(styles.textBlockWrapper)}>
        {overline && <div className={classNames(styles.overline, 'overline')}>{overline}</div>}
        {bodyCopy && (
          <div className="body-copy">
            <PortableText value={bodyCopy} />
          </div>
        )}
      </div>
    </div>
  );
};
export default TextBlock;
