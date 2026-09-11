import { clerkClient } from '@clerk/nextjs/server';

export type AuthorInfo = { name: string; avatarUrl: string | null };

const FALLBACK_AUTHOR: AuthorInfo = { name: 'Angler', avatarUrl: null };

export async function getAuthorsByClerkId(clerkUserIds: string[]): Promise<Map<string, AuthorInfo>> {
  const uniqueIds = Array.from(new Set(clerkUserIds));
  if (uniqueIds.length === 0) return new Map();

  const client = await clerkClient();
  const { data: users } = await client.users.getUserList({ userId: uniqueIds, limit: uniqueIds.length });

  return new Map(
    users.map((user) => [
      user.id,
      { name: user.username || user.firstName || 'Angler', avatarUrl: user.imageUrl ?? null },
    ]),
  );
}

export function resolveAuthor(map: Map<string, AuthorInfo>, clerkUserId: string): AuthorInfo {
  return map.get(clerkUserId) ?? FALLBACK_AUTHOR;
}
