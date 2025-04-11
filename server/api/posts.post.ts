import { v4 } from 'uuid';
import { db } from '../db';
import { posts } from '../db/schema';

// Create a new post
export default defineEventHandler(async (event) => {
  const { userId } = event.context.auth();

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

  try {
    const body = await readBody(event);

    // Save the post in the DB
    const id = v4();
    const now = new Date();
    await db.insert(posts).values({
      content: body.content,
      createdAt: now,
      framework: 'vue',
      id,
      user: userId,
    });

    return {
      success: true,
    };
  } catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: (e as Error).message,
    });
  }
});
