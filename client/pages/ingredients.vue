<template>
  <LayoutSection class="space-y-4 p-6">
    <LayoutPageTitle class="text-3xl font-bold">Zutaten</LayoutPageTitle>
    <ButtonBig @click="$refs.add_modal.show()">Neue Zutat</ButtonBig>
    <LayoutGrid>
      <CardIngredient
        v-for="ingredient in ingredients"
        :key="ingredient.name"
        :name="ingredient.name"
        :price="ingredient.price"
        @update="update_ingredient"
        @delete="delete_ingredient"
      />
    </LayoutGrid>
  </LayoutSection>
  <ModalIngredient @upserted_ingredient="upsert_ingredient" ref="add_modal" />
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const ingredients: Array<{ name: string; price: string }> = ref([]);

    call_ingredient_get_many().then((data) => {
      ingredients.value = data;
    });

    return {
      ingredients,
    };
  },
  methods: {
    upsert_ingredient(name: string, price: number) {
      const ingredient = this.find_ingredient(name);
      if (ingredient) ingredient.price = price;
      else this.ingredients.push({ name, price });
    },
    update_ingredient(name: string, price: number) {
      const ingredient = this.find_ingredient(name);
      if (!ingredient) return;
      ingredient.price = price;
    },
    delete_ingredient(name: string) {
      this.ingredients = this.ingredients.filter((i) => i.name !== name);
    },
    find_ingredient(name: string) {
      return this.ingredients.find((i) => i.name === name);
    },
  },
});
</script>
