<template>
  <h4
    class="text-md font-regular w-32 truncate whitespace-nowrap"
    :title="amount"
  >
    {{ amount }}&nbsp;L
  </h4>
</template>

<script setup lang="ts">
defineProps({
  amount: {
    type: String,
    required: true,
  },
});
</script>
