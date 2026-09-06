'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import PhotoCard from './PhotoCard';
import type { PhotoWithStats } from '@lib/rateMyCatch';
import styles from '@styles/components/InfiniteCatchList.module.css';

const InfiniteCatchList = ({
  initialPhotos,
  initialCursor,
  mine = false,
  emptyMessage = 'No catches posted yet — be the first to share one.',
}: {
  initialPhotos: PhotoWithStats[];
  initialCursor: string | null;
  mine?: boolean;
  emptyMessage?: string;
}) => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [cursor, setCursor] = useState(initialCursor);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchNextPage = useCallback(async () => {
    if (!cursor || isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ cursor });
      if (mine) params.set('mine', '1');
      const res = await fetch(`/api/rate-my-catch/photos?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to load more catches.');
      const data: { photos: PhotoWithStats[]; nextCursor: string | null } = await res.json();
      setPhotos((prev) => [...prev, ...data.photos]);
      setCursor(data.nextCursor);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [cursor, isLoading, mine]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !cursor) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) fetchNextPage();
      },
      { rootMargin: '400px' },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [cursor, fetchNextPage]);

  if (photos.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <>
      <div className={styles.photoGrid}>
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {cursor && (
        <div ref={sentinelRef} className={styles.sentinel}>
          {isLoading && <span className={styles.loading}>Loading more…</span>}
        </div>
      )}
    </>
  );
};

export default InfiniteCatchList;
