<template>
  <section class="justify-start space-y-4 p-6">
    <h1 class="text-3xl font-bold">Zutaten</h1>
    <Bigbutton @click="$refs.add_modal.show()">Neue Zutat</Bigbutton>
    <div class="grid grid-cols-4 gap-6">
      <CardIngredient
        v-for="ingredient in ingredients"
        :key="ingredient.name"
        :name="ingredient.name"
        :price="ingredient.price"
        @update="update_ingredient"
        @delete="delete_ingredient"
      />
    </div>
  </section>
  <Modal @submit="add_ingredient()" ref="add_modal">
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
        <FormInputFloat class="w-full" name="price" />
      </div>
    </form>
  </Modal>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    return {
      ingredients: ref([
        { name: 'Tomate', price: 0.5 },
        { name: 'Käse', price: 1.5 },
        { name: 'Salami', price: 2.5 },
      ]),
    };
  },
  methods: {
    add_ingredient() {
      console.log(this.$refs.add_ingredient_form);
      if (!this.$refs.add_ingredient_form.reportValidity()) return;
      const form_data = new FormData(this.$refs.add_ingredient_form);
      const name = form_data.get('name') as string;
      const price = parseFloat(form_data.get('price') as string);
      console.log(name, price);
      this.ingredients.push({ name, price });
    },
    update_ingredient(name: string, price: number) {
      const ingredient = this.ingredients.find((i) => i.name === name);
      if (!ingredient) return;
      ingredient.price = price;
    },
    delete_ingredient(name: string) {
      this.ingredients = this.ingredients.filter((i) => i.name !== name);
    },
  },
});
</script>
