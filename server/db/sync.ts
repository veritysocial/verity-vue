import pg from 'pg';
import { io } from '../plugins/socket.io';
import { createClerkClient } from '@clerk/nuxt/server';

// Create the clerk context
const ctx = createClerkClient({
  secretKey: process.env.NUXT_CLERK_SECRET_KEY,
  publishableKey: process.env.NUXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
});

const connectionString = process.env.DATABASE_URL;
const client = new pg.Client({ connectionString });
const channel = 'new_post';

export async function listenToNotifications() {
  try {
    await client.connect();
    client.on('notification', async (msg) => {
      const post = JSON.parse(msg.payload!).post;
      const user = await ctx.users.getUser(post.user);
      io.emit('post', {
        ...post,
        username: user.username,
        image: user.imageUrl,
        createdAt: new Date(post.createdAt),
      });
    });

    await client.query(`LISTEN ${channel}`);
    console.log(`Listening for notifications on ${channel}`);
  } catch (e) {
    console.log(e);
  }
}
