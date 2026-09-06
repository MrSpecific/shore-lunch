import { SignIn } from '@clerk/nextjs';
import { Page } from '@layout';
import styles from '../SignInPage.module.css';

export default function SignInPage() {
  return (
    <Page>
      <div className={styles.authPage}>
        <SignIn />
      </div>
    </Page>
  );
}
