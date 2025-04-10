import { desc } from 'drizzle-orm';
import { db } from '../db';
import { posts } from '../db/schema';
import type { TPostClient } from '../db/schema';
import { clerkClient } from '@clerk/nuxt/server';

// Fetch and return the posts from the DB
export default defineEventHandler(async (event): Promise<TPostClient[]> => {
  const dbPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  const storedPosts: TPostClient[] = [];

  // Replace the user IDs with useful details
  for (const post of dbPosts) {
    // BE CAREFUL TO NOT RETURN THE CLERK OBJECT, THAT WILL
    // LEAK SENSITIVE DATA SUCH AS EMAILS & PHONE NUMBERS
    const userData = await clerkClient(event).users.getUser(post.user);
    storedPosts.push({
      ...post,
      username: userData.username!,
      image: userData.imageUrl,
    });
  }

  return storedPosts;
});
