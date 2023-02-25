import Link from 'next/link';
import Image from 'next/image';

import siteInfo from '@lib/siteInfo.js';
import Copyright from '@components/Copyright';
import Attribution from '@components/Attribution';
import SocialLinks from '@components/SocialLinks';
import { CoffeeOutsideMug } from '@svg';
import styles from '@styles/components/Footer.module.css';

const SocialContent = () => {
  return (
    <div className={styles.footerItem} id={styles.socialContent}>
      <h3 className="overline">Social</h3>
      <SocialLinks />
    </div>
  );
};

const LegalContent = () => {
  return (
    <div className={styles.footerItem} id={styles.legalContent}>
      <h3 className="overline">Legal</h3>
      <ul>
        <li>
          <Link href="/terms-conditions">{'Terms & Conditions'}</Link>
        </li>
        <li>
          <Link href="/privacy-policy">{'Privacy Policy'}</Link>
        </li>
        <li>
          <Copyright />
        </li>
        <li>
          <Attribution />
        </li>
      </ul>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <h2 className="visually-hidden">Footer</h2>
        <CoffeeOutsideMug className={styles.logo} />
        <div className={styles.footerItems}>
          <SocialContent />
          {/* <LegalContent /> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
