<template>
  <LayoutSection class="space-y-4 p-6">
    <LayoutPageTitle class="text-3xl font-bold">Zutaten</LayoutPageTitle>
    <ButtonToggle ref="add_ingredient_toggle" button_text="Zutat hinzufügen">
      <form
        @submit.prevent="add_ingredient"
        class="flex items-center space-x-2"
      >
        <FormInput placeholder="Zutatname" name="name" required />
        <ButtonPlus type="submit" />
        <ButtonMinus @click="hide_add_ingredient" />
      </form>
    </ButtonToggle>
    <LayoutGrid>
      <CardIngredient
        v-for="ingredient in ingredients"
        :key="ingredient.name"
        :name="ingredient.name"
        :price="ingredient.price"
        :alcohol="ingredient.alcohol"
        @update_price="update_price"
        @update_alcohol="update_alcohol"
        @delete="delete_ingredient"
      />
    </LayoutGrid>
  </LayoutSection>
</template>

<script lang="ts">
type Ingredient = { name: string; price: number; alcohol: boolean };

export default defineComponent({
  setup() {
    const ingredients: Array<Ingredient> = ref([]);

    call_ingredient_get_many().then((data) => {
      ingredients.value = data;
    });

    return {
      ingredients,
    };
  },
  methods: {
    add_ingredient(e: Event) {
      const form = e.target as HTMLFormElement;
      const form_data = new FormData(form);
      const name = form_data.get('name') as string;
      const price = 0.0;
      call_ingredient_upsert(name, price).then(() => {
        this.upsert_ingredient(name, price);
        this.hide_add_ingredient();
      });
    },
    upsert_ingredient(name: string, price: number) {
      const ingredient = this.find_ingredient(name);
      if (ingredient) ingredient.price = price;
      else this.ingredients.push({ name, price });
    },
    update_price(name: string, price: number) {
      const ingredient = this.find_ingredient(name);
      if (!ingredient) return;
      ingredient.price = price;
    },
    update_alcohol(name: string, alcohol: boolean) {
      const ingredient = this.find_ingredient(name);
      if (!ingredient) return;
      ingredient.alcohol = alcohol;
    },
    delete_ingredient(name: string) {
      this.ingredients = this.ingredients.filter((i) => i.name !== name);
    },
    find_ingredient(name: string) {
      return this.ingredients.find((i) => i.name === name);
    },
    hide_add_ingredient() {
      this.$refs.add_ingredient_toggle.hide();
    },
  },
});
</script>
