<template>
  <div class="flex items-center gap-x-2" :title="amount">
    <span>{{ cl }}</span>
    <span class="font-semibold">L</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  amount: {
    type: String,
    required: true,
  },
});
</script>
