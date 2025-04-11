import { db } from '@/server/db';
import { posts, type TPost } from '@/server/db/schema';
import { clerkClient, type User } from '@clerk/nuxt/server';
import { desc, eq } from 'drizzle-orm';

export type UserReturn = Promise<{
  posts: Omit<TPost, 'user'>[];
  user: {
    username: string;
    image: string;
  };
}>;

export default defineEventHandler(async (event): UserReturn => {
  const username = event.context.params!.username;
  const { data } = await clerkClient(event).users.getUserList({
    username: [username],
  });

  const userData: User = data[0];
  const userPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .where(eq(posts.user, userData.id));

  return {
    user: {
      username,
      image: userData.imageUrl,
    },
    posts: userPosts,
  };
});
