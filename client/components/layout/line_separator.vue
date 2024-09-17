<template>
  <div class="relative w-full">
    <div class="absolute inset-0 flex w-full items-center" aria-hidden="true">
      <div class="w-full border-t border-secondary-300" />
    </div>
    <div
      v-if="title !== ''"
      class="relative flex justify-center text-sm font-medium leading-6"
    >
      <span class="bg-white px-6 text-secondary-900">{{ title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
});
</script>
