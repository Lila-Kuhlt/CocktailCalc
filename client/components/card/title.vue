<template>
  <h3 class="truncate text-2xl font-semibold text-secondary-800" :title="title">
    {{ title }}
  </h3>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
