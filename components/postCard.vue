<script setup lang="ts">
import type { TPostClient } from '@/server/db/schema';
import * as Card from '@/components/ui/card';

defineProps<{ post: TPostClient }>();

const frameWorkColors = {
  svelte: 'text-[#FF3E00]',
  react: 'text-[#66DBFB]',
  solid: 'text-[#315A99]',
  vue: 'text-[#3FB27F]',
};
</script>

<template>
  <Card.Root class="border-primary mx-auto w-11/12 rounded-lg md:w-1/2">
    <Card.Header>
      <Card.Title class="flex items-center justify-start gap-2 font-normal">
        <img class="h-5 rounded-full" :src="post.image" :alt="`verity user @${post.username}'s profile photo`" />
        <div>
          <a :href="`/user/${post.username}/`" class="font-bold">@{{ post.username }}</a>
          <span class="text-muted-foreground"> on Verity </span>
          <span :class="`${frameWorkColors[post.framework]} font-bold`">{{
            post.framework.charAt(0).toUpperCase() + post.framework.slice(1)
          }}</span>
        </div></Card.Title
      >
    </Card.Header>
    <Card.Content class="text-xl"> {{ post.content }} </Card.Content>
    <Card.Footer class="text-muted-foreground text-sm font-light">
      {{
        post.createdAt.toLocaleDateString(undefined, {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })
      }}
    </Card.Footer>
  </Card.Root>
</template>
