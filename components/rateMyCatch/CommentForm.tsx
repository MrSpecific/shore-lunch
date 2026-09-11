'use client';

import { useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { addCatchComment } from '@/app/rate-my-catch/actions';
import styles from '@styles/components/CommentForm.module.css';

const CommentForm = ({ photoId, isSignedIn }: { photoId: string; isSignedIn: boolean }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!isSignedIn) {
    return (
      <p className={styles.signInPrompt}>
        <Link href={`/sign-in?redirect_url=/rate-my-catch/${photoId}`}>Sign in</Link> to leave a comment.
      </p>
    );
  }

  const handleSubmit = (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      try {
        await addCatchComment(photoId, formData);
        formRef.current?.reset();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong.');
      }
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className={styles.commentForm}>
      <label htmlFor="comment-body" className="visually-hidden">
        Add a comment
      </label>
      <textarea
        id="comment-body"
        name="body"
        maxLength={1000}
        required
        rows={3}
        placeholder="What do you think of this catch?"
        className={styles.textarea}
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit" className="button" disabled={isPending}>
        {isPending ? 'Posting…' : 'Post comment'}
      </button>
    </form>
  );
};

export default CommentForm;
