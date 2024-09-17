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
        :ingredients="recipe.ingredients"
        @delete_recipe="delete_recipe"
        @upsert_recipe_ingredient="upsert_recipe_ingredient"
        @delete_recipe_ingredient="delete_recipe_ingredient"
      />
    </LayoutGrid>
  </LayoutSection>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const recipes: Array<{
      name: string;
      ingredients: [name: string, amount: number];
    }> = ref([]);

    call_recipe_get_many().then((data) => {
      recipes.value = data;
      console.log(data);
    });

    return {
      recipes,
    };
  },
  methods: {
    add_receipt(e: Event) {
      const form = e.target as HTMLFormElement;
      const form_data = new FormData(form);
      const recipe_name = form_data.get('name') as string;
      call_recipe_upsert(recipe_name).then(() => {
        this.recipes.push({ name: recipe_name, ingredients: [] });
        this.$refs.add_receipt_toggle.hide();
      });
    },
    delete_recipe(recipe_name: string) {
      this.recipes = this.recipes.filter(
        (recipe) => recipe.name !== recipe_name,
      );
    },
    upsert_recipe_ingredient(upsert_ingredient: {
      recipe: string;
      ingredient: string;
      amount: number;
    }) {
      const recipe = this.recipes.find(
        (recipe) => recipe.name === upsert_ingredient.recipe,
      );
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
      const recipe = this.recipes.find(
        (recipe) => recipe.name === recipe_ingredient.recipe,
      );
      if (recipe) {
        recipe.ingredients = recipe.ingredients.filter(
          (ingredient) => ingredient.name !== recipe_ingredient.ingredient,
        );
      }
    },
    hide_add_receipt() {
      this.$refs.add_receipt_toggle.hide();
    },
  },
});
</script>
