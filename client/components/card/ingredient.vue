<template>
  <Card @delete="delete_ingredient" :has_alcohol="alcohol">
    <div class="flex items-center justify-between gap-x-2">
      <CardTitle :title="name" />
      <form ref="form" class="ml-auto">
        <FormInputPricePerL
          class="text-right"
          @focusout="update_price"
          :value="price.toFixed(2)"
        />
      </form>
      <button @click="update_alcohol" title="Enthält Alkohol?">
        <PercentBadgeIcon
          :class="['h-6 w-6', alcohol ? 'text-red-500' : 'text-secondary-500']"
        />
      </button>
    </div>
  </Card>
</template>

<script lang="ts">
import { XCircleIcon } from '@heroicons/vue/16/solid';
import { PercentBadgeIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
  components: { XCircleIcon, PercentBadgeIcon },
  setup() {
    return {
      has_alcohol: ref(false),
    };
  },
  emits: ['update_price', 'update_alcohol', 'delete'],
  props: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    alcohol: {
      type: Boolean,
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
    update_alcohol() {
      const has_alcohol = !this.alcohol;
      call_ingredient_upsert(this.name, this.price, has_alcohol).then(() => {
        this.$emit('update_alcohol', this.name, has_alcohol);
      });
    },
  },
});
</script>
