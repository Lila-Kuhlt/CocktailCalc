<template>
  <Card @delete="delete_recipe">
    <div class="flex h-full flex-col items-center justify-between gap-y-2">
      <CardTitle :title="`${name} (${price.toFixed(2)}€)`" />
      <ul class="mt-2 flex w-full flex-grow flex-col justify-between gap-y-1">
        <li v-for="ingredient in ingredients" :key="ingredient.name">
          <form class="flex items-center gap-x-3">
            <LayoutItemTitle :title="ingredient.name" />
            <FormInputCl
              class="w-16"
              :value="ingredient.amount"
              name="amount"
              required
              @focusout="
                upsert_ingredient(ingredient.name, Number($event.target.value))
              "
            />
            <ButtonMinus
              type="button"
              @click="delete_ingredient(name, ingredient.name)"
              class="ml-4"
              title="Zutat entfernen"
            />
          </form>
        </li>
        <li class="mt-auto">
          <LayoutLineSeparator class="my-3" title="Zutat hinzufügen" />
          <form @submit.prevent="add_ingredient" class="flex gap-x-3">
            <SelectItems
              :options="ingredients_many"
              name="ingredient"
            ></SelectItems>
            <FormInputCl class="w-16" value="0" name="amount" required />
            <ButtonPlus class="ml-4" type="submit" title="Zutat hinzufügen" />
          </form>
        </li>
      </ul>
    </div>
  </Card>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const ingredients_many: Array<string> = ref([]);

    call_ingredient_get_many().then((data) => {
      ingredients_many.value = data.map((ingredient) => ingredient.name);
    });

    return {
      ingredients_many,
    };
  },
  emits: [
    'update_price',
    'delete_recipe',
    'upsert_recipe_ingredient',
    'delete_recipe_ingredient',
  ],
  props: {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: Array<{ name: string; amount: number }>,
      required: true,
    },
  },
  methods: {
    delete_recipe() {
      call_recipe_delete(this.name).then(() => {
        this.$emit('delete_recipe', this.name);
      });
    },
    add_ingredient(e: Event) {
      const form = e.target as HTMLFormElement;
      const form_data = new FormData(form);
      const ingredient_name = form_data.get('ingredient') as string | null;
      const ingredient_amount = parseFloat(form_data.get('amount') as string);
      if (ingredient_name === null || isNaN(ingredient_amount)) return;
      const upsert_ingredient = {
        recipe: this.name,
        ingredient: ingredient_name,
        amount: ingredient_amount,
      };

      call_recipe_upsert_ingredient(upsert_ingredient).then((recipe) => {
        this.$emit('upsert_recipe_ingredient', upsert_ingredient);
        this.$emit('update_price', this.name, recipe.price);
      });
    },
    upsert_ingredient(name: string, amount: number) {
      const upsert_ingredient = {
        recipe: this.name,
        ingredient: name,
        amount: amount,
      };
      call_recipe_upsert_ingredient(upsert_ingredient).then((recipe) => {
        this.$emit('upsert_recipe_ingredient', upsert_ingredient);
        this.$emit('update_price', this.name, recipe.price);
      });
    },
    delete_ingredient(recipe_name: string, ingredient_name: string) {
      const ingredient = {
        recipe: recipe_name,
        ingredient: ingredient_name,
      };
      call_recipe_delete_ingredient(ingredient).then((recipe) => {
        this.$emit('delete_recipe_ingredient', ingredient);
        this.$emit('update_price', this.name, recipe.price);
      });
    },
  },
});
</script>
