<script setup lang="ts">
const route = useRoute();

const { data: data } = await useFetch(`/api/user/${route.params.user}`);

useHead({
  title: `Verity (Vue Edition) | @${route.params.user}`,
  meta: [
    {
      name: 'description',
      content:
        'Verify (Vertical + Community) is a project built by April Hall to try out a bunch of different javascript frameworks by making the same app in 5 of them',
    },
  ],
});
</script>

<template>
  <main>
    <div class="mt-8 flex w-full flex-col items-center justify-center">
      <img class="h-36 w-36 rounded-full" :src="data?.user.image" />
      <h1 class="text-3xl">@{{ route.params.user }}</h1>
    </div>
    <div class="mt-8 flex flex-col gap-4 pb-8">
      <PostCard
        v-for="post in data!.posts"
        :key="post.id"
        :post="{
          ...post,
          createdAt: new Date(post.createdAt),
          username: route.params.user as string,
          image: data!.user.image!,
        }"
      />
    </div>
  </main>
</template>
