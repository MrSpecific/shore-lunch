import siteInfo from '@lib/siteInfo';
import handleize from '@utils/handleize';
import styles from './Attribution.module.css';

const Attribution = () => {
  const url = `https://willchristenson.com?utm_source=${handleize(
    siteInfo.title
  )}&utm_medium=nextjs&utm_campaign=attribution_link`;

  return (
    <div className={styles.attribution}>
      Website by&nbsp;
      <a href={url} target="_blank" rel="noopener noreferrer">
        Will Christenson
      </a>
    </div>
  );
};

export default Attribution;
