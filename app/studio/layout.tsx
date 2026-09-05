import { NextStudioLayout } from 'next-sanity/studio';
import styles from './layout.module.css';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.studioViewport}>
      <NextStudioLayout>{children}</NextStudioLayout>
    </div>
  );
}
