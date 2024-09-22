<template>
  <div
    :class="[
      'overflow-hidden rounded-lg shadow outline',
      has_alcohol
        ? 'outline-red-200 dark:outline-red-700'
        : 'outline-secondary-200 dark:outline-secondary-700',
    ]"
  >
    <ButtonMinusSmall
      v-if="!hide_button_minus"
      @click="delete_item"
      class="absolute"
    />
    <div class="w-min-16 h-full px-8 py-5 sm:p-6">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  emits: ['delete'],
  props: {
    hide_button_minus: {
      type: Boolean,
      default: false,
    },
    has_alcohol: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    delete_item() {
      if (!confirm('Item wirklich löschen?')) return;
      this.$emit('delete');
    },
  },
});
</script>
