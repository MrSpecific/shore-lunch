import styles from '@styles/components/TextBlock.module.css';

const TextBlock = (props) => {
  const headline = props.headline;
  const bodyCopy = props.bodyCopy;
  return (
    <div className={styles.textBlock}>
      {headline && <h2 className={styles.headline}>{headline}</h2>}
      {bodyCopy && <div className="body-copy">{bodyCopy}</div>}
    </div>
  );
};
export default TextBlock;
