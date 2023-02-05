import siteInfo from '@lib/siteInfo.js';

const Copyright = () => {
  const currentYear = new Date().getFullYear().toString();
  let yearDisplay = currentYear;
  if (siteInfo?.copyright?.year && siteInfo?.copyright?.year !== currentYear) {
    yearDisplay = `${siteInfo?.copyright?.year}-${currentYear}`;
  }
  return (
    <div className="copyright">
      &copy;{yearDisplay} {siteInfo?.copyright?.company}
    </div>
  );
};

export default Copyright;
