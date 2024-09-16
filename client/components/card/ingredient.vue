<template>
  <div
    class="overflow-hidden rounded-lg shadow outline outline-secondary-200 dark:outline-secondary-700"
  >
    <button @click="delete_ingredient" class="absolute">
      <XCircleIcon class="w-5 fill-secondary-400" />
    </button>
    <div class="flex items-center justify-between px-4 py-5 sm:p-6">
      <h3 class="text-2xl font-semibold">{{ name }}</h3>
      <form ref="form" class="flex items-center space-x-2">
        <input
          @focusout="update_price"
          class="block w-16 rounded-md border-0 py-1.5 text-right text-lg text-secondary-900 shadow-sm ring-1 ring-inset ring-secondary-300 placeholder:text-secondary-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          type="number"
          step="0.01"
          :min="0"
          :max="1000000"
          :value="price.toFixed(2)"
        />
        <span>€</span>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { XCircleIcon } from '@heroicons/vue/16/solid';

export default defineComponent({
  components: { XCircleIcon },
  emits: ['update', 'delete'],
  props: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  methods: {
    update_price(event: InputEvent) {
      if (!this.$refs.form.reportValidity()) return;
      const price = parseFloat((event.target as HTMLInputElement).value);
      this.$emit('update', this.name, price);
    },
    delete_ingredient() {
      if (!confirm('Zutat wirklich löschen?')) return;
      this.$emit('delete', this.name);
    },
  },
});
</script>
