<template>
  <Card @delete="delete_ingredient">
    <div class="flex items-center justify-between gap-x-2">
      <CardTitle :title="name" />
      <form ref="form">
        <FormInputPrice
          class="w-24 text-right"
          @focusout="update_price"
          :value="price.toFixed(2)"
        />
      </form>
    </div>
  </Card>
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
      call_ingredient_upsert(this.name, price).then(() => {
        this.$emit('update', this.name, price);
      });
    },
    delete_ingredient() {
      call_ingredient_delete(this.name).then(() => {
        this.$emit('delete', this.name);
      });
    },
  },
});
</script>
