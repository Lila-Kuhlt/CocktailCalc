<template>
  <select
    class="block w-full rounded-md border border-secondary-200 bg-white px-3 py-2 text-base text-secondary-800 shadow-sm focus:border-secondary-500 focus:outline-none focus:ring-secondary-500 dark:border-secondary-800 dark:bg-secondary-800 dark:text-secondary-200 sm:text-sm"
    v-model="selected"
  >
    <option
      v-for="option in options"
      :key="option"
      :value="option"
      :title="option"
      class="truncate whitespace-nowrap"
    >
      {{ option }}
    </option>
  </select>
</template>

<script setup lang="ts">
const props = defineProps<{
  options: {
    type: Array<string>;
    required: true;
  };
}>();

const selected = ref(props.options[0]);
</script>
