import { v4 } from 'uuid';
import { db } from '../db';
import { posts } from '../db/schema';
import { clerkClient } from '@clerk/nuxt/server';
import { io } from '../plugins/socket.io';

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

    // Get user data
    const userData = await clerkClient(event).users.getUser(userId);

    // Create post object
    const newPost = {
      content: body.content,
      createdAt: now,
      framework: 'vue',
      id,
      username: userData.username,
      image: userData.imageUrl,
    };

    io.emit('post', newPost);

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
