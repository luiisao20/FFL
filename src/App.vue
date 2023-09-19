<template>
  <RouterView />
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
// npx tailwindcss -i ./src/assets/main.css -o ./public/output.css --watch

</script>

