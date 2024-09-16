<template>
  <div
    class="overflow-hidden rounded-lg shadow outline outline-secondary-200 dark:outline-secondary-700"
  >
    <button @click="delete_ingredient" class="absolute">
      <XCircleIcon class="w-5 fill-secondary-400" />
    </button>
    <div class="flex items-center justify-between px-4 py-5 sm:p-6">
      <h3 class="text-2xl font-semibold">{{ name }}</h3>
      <form ref="form">
        <FormInputPrice
          class="text-right"
          @focusout="update_price"
          :value="price.toFixed(2)"
        />
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
