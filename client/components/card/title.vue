<template>
  <h3 class="truncate whitespace-nowrap text-2xl font-semibold" :title="title">
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
