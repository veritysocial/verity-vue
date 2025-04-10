import { desc } from 'drizzle-orm';
import { db } from '../db';
import { posts } from '../db/schema';

// Fetch and return the posts from the DB
export default defineEventHandler(async () => {
  const dbPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));
  return dbPosts;
});
