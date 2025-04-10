<script setup lang="ts">
import * as Card from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ref } from 'vue';
import { socket } from '@/components/socket';
import type { TPostClient } from '@/server/db/schema';

const { data: posts } = await useFetch('/api/posts');
const message = ref('');
const messages = ref<TPostClient[]>([]);

socket.on('post', (v) => {
  messages.value = [v as TPostClient, ...messages.value];
  console.log(messages.value);
});

async function submitForm() {
  await $fetch('/api/posts', {
    method: 'POST',
    body: {
      content: message.value,
    },
  });
}
</script>

<template>
  <main class="min-h-screen w-screen pt-8">
    <SignedIn>
      <Card.Root class="border-primary mx-auto w-11/12 rounded-lg md:w-1/2">
        <Card.Header>
          <Card.Title>Create Post</Card.Title>
          <Card.Description
            >Posting from Verity <span class="font-bold text-[#3FB27F]">Vue</span></Card.Description
          >
        </Card.Header>
        <Card.Content>
          <Textarea
            id="content"
            v-model="message"
            name="content"
            placeholder="Share your thoughts with the world!"
          />
        </Card.Content>
        <Card.Footer>
          <Button class="cursor-pointer" @click="submitForm()">Post!</Button>
        </Card.Footer>
      </Card.Root>
    </SignedIn>
    <div class="mt-8 flex flex-col gap-4 pb-8">
      <PostCard
        v-for="post in messages.values()"
        :key="post.id"
        :post="{
          ...post,
          createdAt: new Date(post.createdAt),
        }"
      />
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="{
          ...post,
          createdAt: new Date(post.createdAt),
        }"
      />
    </div>
  </main>
</template>
