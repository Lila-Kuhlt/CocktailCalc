<template>
  <select
    class="block w-full rounded-md border border-secondary-200 bg-white px-3 py-2 text-base text-secondary-800 shadow-sm focus:border-secondary-500 focus:outline-none focus:ring-secondary-500 sm:text-sm"
    v-model="selected"
  >
    <option v-for="option in options" :key="option" :value="option">
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
  default: {
    type: string;
    default: '';
  };
}>();

const selected = ref(props.default);
</script>
