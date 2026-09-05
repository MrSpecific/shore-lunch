import { useCallback, useEffect, useState } from 'react';
import { ArchiveIcon } from '@sanity/icons/Archive';
import { TrashIcon } from '@sanity/icons/Trash';
import { Badge, Box, Button, Card, Dialog, Flex, Heading, Spinner, Stack, Text } from '@sanity/ui';
import { useUser } from '@clerk/nextjs';
import { definePlugin } from 'sanity';

type AdminPhoto = {
  id: number;
  authorName: string;
  imageUrl: string;
  caption: string | null;
  archived: boolean;
  createdAt: string;
  averageRating: number | null;
  ratingCount: number;
  commentCount: number;
};

const PhotoRow = ({
  photo,
  busy,
  onToggleArchive,
  onRequestDelete,
}: {
  photo: AdminPhoto;
  busy: boolean;
  onToggleArchive: () => void;
  onRequestDelete: () => void;
}) => {
  return (
    <Card padding={3} radius={2} shadow={1} tone={photo.archived ? 'caution' : undefined}>
      <Flex gap={3} align="center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.imageUrl}
          alt=""
          width={64}
          height={64}
          style={{ objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
        />
        <Box flex={1}>
          <Stack gap={2}>
            <Flex align="center" gap={2}>
              <Text weight="semibold">{photo.caption || 'Untitled catch'}</Text>
              {photo.archived && <Badge tone="caution">Archived</Badge>}
            </Flex>
            <Text size={1} muted>
              By {photo.authorName} · {new Date(photo.createdAt).toLocaleDateString()}
            </Text>
            <Text size={1} muted>
              {photo.averageRating !== null ? `${photo.averageRating.toFixed(1)} avg` : 'No ratings'} ·{' '}
              {photo.ratingCount} rating{photo.ratingCount === 1 ? '' : 's'} · {photo.commentCount} comment
              {photo.commentCount === 1 ? '' : 's'}
            </Text>
          </Stack>
        </Box>
        <Flex gap={2}>
          <Button
            text={photo.archived ? 'Unarchive' : 'Archive'}
            icon={ArchiveIcon}
            mode="ghost"
            disabled={busy}
            onClick={onToggleArchive}
          />
          <Button
            text="Delete"
            icon={TrashIcon}
            tone="critical"
            mode="ghost"
            disabled={busy}
            onClick={onRequestDelete}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

const RateMyCatchTool = () => {
  const { user, isLoaded } = useUser();
  const isAdmin = Boolean(user?.publicMetadata?.role === 'admin');

  const [photos, setPhotos] = useState<AdminPhoto[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const loadPhotos = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch('/api/admin/rate-my-catch');
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error || `Request failed (${res.status})`);
      setPhotos(body.photos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }, []);

  useEffect(() => {
    if (isLoaded && isAdmin) loadPhotos();
  }, [isLoaded, isAdmin, loadPhotos]);

  const handleToggleArchive = async (photo: AdminPhoto) => {
    setBusyId(photo.id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/rate-my-catch/${photo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archived: !photo.archived }),
      });
      if (!res.ok) throw new Error('Failed to update this post.');
      await loadPhotos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (photoId: number) => {
    setBusyId(photoId);
    setError(null);
    try {
      const res = await fetch(`/api/admin/rate-my-catch/${photoId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete this post.');
      setConfirmDeleteId(null);
      await loadPhotos();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setBusyId(null);
    }
  };

  if (!isLoaded) {
    return (
      <Flex padding={4} justify="center">
        <Spinner />
      </Flex>
    );
  }

  if (!isAdmin) {
    return (
      <Card padding={4} tone="caution">
        <Stack gap={3}>
          <Heading size={1}>Rate My Catch</Heading>
          <Text>
            You need to be signed in to the main site with an admin account to moderate Rate My Catch
            posts.
          </Text>
        </Stack>
      </Card>
    );
  }

  return (
    <Card padding={4}>
      <Stack gap={4}>
        <Flex align="center" justify="space-between">
          <Heading size={1}>Rate My Catch — Moderation</Heading>
          <Button text="Refresh" mode="ghost" onClick={loadPhotos} />
        </Flex>

        {error && (
          <Card padding={3} tone="critical" radius={2}>
            <Text>{error}</Text>
          </Card>
        )}

        {photos === null ? (
          <Flex padding={4} justify="center">
            <Spinner />
          </Flex>
        ) : photos.length === 0 ? (
          <Text muted>No posts yet.</Text>
        ) : (
          <Stack gap={3}>
            {photos.map((photo) => (
              <PhotoRow
                key={photo.id}
                photo={photo}
                busy={busyId === photo.id}
                onToggleArchive={() => handleToggleArchive(photo)}
                onRequestDelete={() => setConfirmDeleteId(photo.id)}
              />
            ))}
          </Stack>
        )}
      </Stack>

      {confirmDeleteId !== null && (
        <Dialog
          id="confirm-delete-catch-photo"
          header="Delete this post?"
          onClose={() => setConfirmDeleteId(null)}
          footer={
            <Flex padding={3} justify="flex-end" gap={2}>
              <Button text="Cancel" mode="ghost" onClick={() => setConfirmDeleteId(null)} />
              <Button
                text="Delete permanently"
                tone="critical"
                loading={busyId === confirmDeleteId}
                onClick={() => handleDelete(confirmDeleteId)}
              />
            </Flex>
          }
        >
          <Box padding={4}>
            <Text>
              This permanently deletes the photo, its ratings, and its comments. This can&apos;t be
              undone — archiving instead just hides it from the public site.
            </Text>
          </Box>
        </Dialog>
      )}
    </Card>
  );
};

const rateMyCatchTool = () => {
  return {
    title: 'Rate My Catch',
    name: 'rate-my-catch',
    icon: ArchiveIcon,
    component: RateMyCatchTool,
  };
};

export const rateMyCatchModeration = definePlugin({
  name: 'rateMyCatchModerationPlugin',
  tools: [rateMyCatchTool()],
});
