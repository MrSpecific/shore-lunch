'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { uploadCatchPhoto } from '@/app/rate-my-catch/actions';
import ImageDropzone from './ImageDropzone';
import styles from '@styles/components/UploadForm.module.css';

const UploadForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      try {
        const { photoId } = await uploadCatchPhoto(formData);
        router.push(`/rate-my-catch/${photoId}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      }
    });
  };

  return (
    <form action={handleSubmit} className={styles.uploadForm}>
      <ImageDropzone name="image" accept="image/jpeg,image/png,image/webp,image/heic" required />

      <label htmlFor="caption">Caption</label>
      <input
        id="caption"
        name="caption"
        type="text"
        maxLength={200}
        placeholder="What'd you catch - or cook?"
      />

      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className="button" disabled={isPending}>
        {isPending ? 'Uploading…' : 'Post your catch'}
      </button>
    </form>
  );
};

export default UploadForm;
