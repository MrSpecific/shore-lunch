import { SignUp } from '@clerk/nextjs';
import { Page } from '@layout';
import styles from '../SignUpPage.module.css';

export default function SignUpPage() {
  return (
    <Page>
      <div className={styles.authPage}>
        <SignUp />
      </div>
    </Page>
  );
}
