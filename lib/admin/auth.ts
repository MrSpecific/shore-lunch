import { currentUser } from '@clerk/nextjs/server';

export async function requireAdminUser() {
  const user = await currentUser();
  if (!user || user.publicMetadata?.role !== 'admin') {
    return null;
  }
  return user;
}
