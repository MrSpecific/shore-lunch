import siteInfo from '@lib/siteInfo.js';

const SocialLink = ({ name, href }) => {
  return (
    <li>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {name}
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
  return <ul>{socialLinks}</ul>;
};

export default SocialLinks;
