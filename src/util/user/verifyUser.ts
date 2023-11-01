import { User } from '@prisma/client';

export async function verifyUser(user: User) {
  const res = await fetch('/api/user', { method: 'GET' });
  const { users }: { users: User[] } = await res.json();

  for (const dbUser of users)
    if (dbUser.email == user.email && dbUser.password == user.password) return dbUser.id;
  return null;
}
