<script setup lang="ts">
import { buttonVariants } from './components/ui/button';
import { useClerkAppearance } from './lib/useClerkAppearance';
import { socket } from '@/components/socket';

useHead({
  bodyAttrs: {
    class: 'dark bg-background',
  },
});

// Websocket
const isConnected = ref(false);
const transport = ref('N/A');

if (socket.connected) {
  onConnect();
}

function onConnect() {
  isConnected.value = true;
  transport.value = socket.io.engine.transport.name;
  console.log('Websocket connected.');

  socket.io.engine.on('upgrade', (rawTransport) => {
    transport.value = rawTransport.name;
  });
}

function onDisconnect() {
  isConnected.value = false;
  transport.value = 'N/A';
}

socket.on('connect', onConnect);
socket.on('disconnect', onDisconnect);

onBeforeUnmount(() => {
  socket.off('connect', onConnect);
  socket.off('disconnect', onDisconnect);
});
</script>

<template>
  <ConnectionClient />
  <div class="text-foreground fixed top-4 right-4 flex flex-col items-end">
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
  <nav class="fixed top-4 left-4">
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
