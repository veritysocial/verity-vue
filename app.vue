<script setup lang="ts">
import * as Card from '@/components/ui/card';
</script>

<template>
  <main>
    <Card.Root class="bg-primary">
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card Description</Card.Description>
      </Card.Header>
      <Card.Content> Card Content </Card.Content>
      <Card.Footer> Card Footer </Card.Footer>
    </Card.Root>
  </main>
</template>
