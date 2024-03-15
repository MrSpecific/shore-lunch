import siteInfo from '@lib/siteInfo.js';
import { TwitterIcon, InstagramIcon, YouTubeIcon, PatreonIcon } from '@svg';
import styles from '@styles/components/SocialLinks.module.css';

const renderIcon = (name) => {
  switch (name.toLowerCase()) {
    case 'instagram':
      return <InstagramIcon />;
    case 'twitter':
      return <TwitterIcon />;
    case 'youtube':
      return <YouTubeIcon />;
    case 'patreon':
      return <PatreonIcon />;
    default:
      return name;
  }
};

const SocialLink = ({ name, href }) => {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span className="visually-hidden">{name}</span>
        {renderIcon(name)}
      </a>{' '}
    </li>
  );
};

const socials = siteInfo?.social;
const socialLinks = [];

for (const social in socials) {
  socialLinks.push(<SocialLink name={social} href={socials[social]} key={social} />);
}

const SocialLinks = () => {
  return <ul className={styles.socialLinks}>{socialLinks}</ul>;
};

export default SocialLinks;
