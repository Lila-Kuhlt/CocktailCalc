<template>
  <div class="flex items-center gap-x-2" :title="amount">
    <span class="font-medium">{{ l.toFixed(1) }}</span>
    <span class="font-medium">L</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  l: {
    type: Number,
    required: true,
  },
});
</script>
