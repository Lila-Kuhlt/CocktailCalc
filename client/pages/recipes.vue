<template>
  <LayoutSection>
    <LayoutPageTitle>Rezepte</LayoutPageTitle>
    <ButtonToggle ref="add_receipt_toggle" button_text="Rezept hinzufügen">
      <form @submit.prevent="add_receipt" class="flex items-center space-x-2">
        <FormInput placeholder="Rezeptname" name="name" required />
        <ButtonPlus type="submit" />
        <ButtonMinus @click="hide_add_receipt" />
      </form>
    </ButtonToggle>

    <LayoutGrid>
      <CardRecipe
        v-for="recipe in recipes"
        :key="recipe.name"
        :name="recipe.name"
        :price="recipe.price"
        :alcohol="recipe.alcohol"
        :ingredients="recipe.ingredients"
        @update_alcohol="update_alcohol"
        @update_price="update_price"
        @delete_recipe="delete_recipe"
        @upsert_recipe_ingredient="upsert_recipe_ingredient"
        @delete_recipe_ingredient="delete_recipe_ingredient"
      />
    </LayoutGrid>
  </LayoutSection>
</template>

<script lang="ts">
type Recipe = {
  name: string;
  price: number;
  alcohol: boolean;
  ingredients: Array<{
    name: string;
    amount: number;
  }>;
};

export default defineComponent({
  setup() {
    const recipes: Array<Recipe> = ref([]);

    call_recipe_get_many().then((data) => {
      recipes.value = data;
    });

    return {
      recipes,
    };
  },
  methods: {
    async update_price(name: string, price: number) {
      const recipe = this.find_recipe(name);
      if (recipe) {
        recipe.price = price;
      }
    },
    update_alcohol(name: string, alcohol: boolean) {
      const recipe = this.find_recipe(name);
      if (!recipe) return;
      recipe.alcohol = alcohol;
    },
    add_receipt(e: Event) {
      const form = e.target as HTMLFormElement;
      const form_data = new FormData(form);
      const recipe_name = form_data.get('name') as string;
      call_recipe_upsert(recipe_name).then(() => {
        const recipe = this.find_recipe(recipe_name);
        if (!recipe) {
          this.recipes.push({ name: recipe_name, price: 0.0, ingredients: [] });
        }
        this.$refs.add_receipt_toggle.hide();
      });
    },
    delete_recipe(recipe_name: string) {
      this.filter_recipe(recipe_name);
    },
    upsert_recipe_ingredient(upsert_ingredient: {
      recipe: string;
      ingredient: string;
      amount: number;
    }) {
      const recipe = this.find_recipe(upsert_ingredient.recipe);
      if (recipe) {
        const ingredient = recipe.ingredients.find(
          (ingredient) => ingredient.name === upsert_ingredient.ingredient,
        );
        if (ingredient) {
          ingredient.amount = upsert_ingredient.amount;
        } else {
          recipe.ingredients.push({
            name: upsert_ingredient.ingredient,
            amount: upsert_ingredient.amount,
          });
        }
      }
    },
    delete_recipe_ingredient(recipe_ingredient: {
      recipe: string;
      ingredient: string;
    }) {
      this.filter_recipe_ingredient(
        recipe_ingredient.recipe,
        recipe_ingredient.ingredient,
      );
    },
    find_recipe(recipe_name: string) {
      return this.recipes.find((recipe) => recipe.name === recipe_name);
    },
    filter_recipe(recipe_name: string) {
      this.recipes = this.recipes.filter(
        (recipe) => recipe.name !== recipe_name,
      );
    },
    filter_recipe_ingredient(recipe_name: string, ingredient_name: string) {
      const recipe = this.find_recipe(recipe_name);
      if (recipe) {
        recipe.ingredients = recipe.ingredients.filter(
          (ingredient) => ingredient.name !== ingredient_name,
        );
      }
    },
    hide_add_receipt() {
      this.$refs.add_receipt_toggle.hide();
    },
  },
});
</script>
