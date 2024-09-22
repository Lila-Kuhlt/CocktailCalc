<template>
  <h4
    class="w-full truncate whitespace-nowrap text-lg font-medium"
    :title="title"
  >
    {{ title }}
  </h4>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
