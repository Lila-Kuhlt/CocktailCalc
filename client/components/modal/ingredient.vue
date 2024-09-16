<template>
  <Modal @submit="add_ingredient" ref="modal">
    <form
      ref="add_ingredient_form"
      class="flex flex-col justify-between space-y-4"
    >
      <div>
        <div class="font-semibold">Neue&nbsp;Zutat</div>
        <FormInput class="w-full" type="text" name="name" />
      </div>

      <div>
        <div class="font-semibold">Preis</div>
        <div>
          <FormInputPrice class="w-full" name="price" />
        </div>
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
import { call_api, Method } from '~/util/api';

export default defineComponent({
  emits: ['added_ingredient'],
  methods: {
    show() {
      this.$refs.modal.show();
    },
    add_ingredient() {
      if (!this.$refs.add_ingredient_form.reportValidity()) return;
      const form_data = new FormData(this.$refs.add_ingredient_form);
      const name = form_data.get('name') as string;
      const price = parseFloat(form_data.get('price') as string);
      call_api(Method.POST, '/ingredient', { name, price }).then(() => {
        this.$emit('added_ingredient', { name, price });
        this.$refs.modal.hide();
      });
    },
  },
});
</script>
