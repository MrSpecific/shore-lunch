import siteInfo from '@lib/siteInfo.js';
import handleize from '@utils/handleize';

import classNames from 'classnames';

const Attribution = () => {
  const url = `https://willchristenson.com?utm_source=${handleize(
    siteInfo.title
  )}&utm_medium=nextjs&utm_campaign=attribution_link`;

  const attributionClass = classNames({});

  return (
    <div className={attributionClass}>
      <style jsx global>{`
        .attribution {
          display: flex;
          align-items: center;
          line-height: 1;
        }
        .attribution .svg-graphic {
          width: 50px;
          fill: currentColor;
          margin-left: 0.5em;
        }
      `}</style>
      Website by&nbsp;
      <a href={url} target="_blank" rel="noopener noreferrer">
        Will Christenson
      </a>
    </div>
  );
};

export default Attribution;
