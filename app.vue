<script setup lang="ts">
import { buttonVariants } from './components/ui/button';
import { useClerkAppearance } from './lib/useClerkAppearance';

useHead({
  bodyAttrs: {
    class: 'dark bg-background',
  },
});
</script>

<template>
  <div class="text-foreground absolute top-4 right-4 flex flex-col items-end">
    <VerityLogo />
    <p class="w-fit">
      by
      <a
        href="https://www.arithefirst.com/"
        class="text-primary hover:text-primary/90 mr-2 underline"
        target="_blank"
        >April Hall</a
      >
    </p>
  </div>
  <nav class="absolute top-4 left-4">
    <SignedOut>
      <SignUpButton
        mode="modal"
        :class="`${buttonVariants({ variant: 'default' })} cursor-pointer`"
        :appearance="useClerkAppearance()"
      />
    </SignedOut>
    <SignedIn>
      <UserButton
        :appearance="{
          ...useClerkAppearance(),
          elements: {
            userButtonAvatarBox: {
              height: '48px',
              width: '48px',
            },
          },
        }"
      />
    </SignedIn>
  </nav>
  <div>
    <NuxtPage />
  </div>
</template>
