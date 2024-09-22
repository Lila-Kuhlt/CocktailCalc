<template>
  <div class="flex items-center gap-x-2" :title="cl">
    <span>{{ cl }}</span>
    <span class="font-semibold">cl</span>
  </div>
</template>

<script setup lang="ts">
defineProps({
  cl: {
    type: String,
    required: true,
  },
});
</script>
