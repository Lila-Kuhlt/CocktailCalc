<template>
  <Card @delete="delete_recipe">
    <div class="flex flex-col items-center justify-between gap-y-2">
      <CardTitle :title="name" />
      <ul class="mt-2 flex w-full flex-col justify-between gap-y-1">
        <li v-for="ingredient in ingredients" :key="ingredient.name">
          <form class="flex items-center gap-x-3">
            <h4 class="w-full text-lg">
              {{ ingredient.name }}
            </h4>
            <FormInputAmount
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
        <LayoutLineSeparator class="my-2" title="Zutat hinzufügen" />
        <li>
          <form @submit.prevent="add_ingredient" class="flex gap-x-3">
            <SelectItems
              :options="ingredients_many"
              name="ingredient"
            ></SelectItems>
            <FormInputAmount class="w-16" value="0" name="amount" required />
            <ButtonPlus class="ml-4" type="submit" title="Zutat hinzufügen" />
          </form>
        </li>
      </ul>
    </div>
  </Card>
</template>

<script lang="ts">
import { call_recipe_upsert_ingredient } from '~/utils/api';

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
    'delete_recipe',
    'upsert_recipe_ingredient',
    'delete_recipe_ingredient',
  ],
  props: {
    name: {
      type: String,
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
      const ingredient_name = form_data.get('ingredient') as string;
      const ingredient_amount = parseFloat(form_data.get('amount') as string);
      const upsert_ingredient = {
        recipe: this.name,
        ingredient: ingredient_name,
        amount: ingredient_amount,
      };

      call_recipe_upsert_ingredient(upsert_ingredient).then(() => {
        this.$emit('upsert_recipe_ingredient', upsert_ingredient);
      });
    },
    upsert_ingredient(name: string, amount: number) {
      const upsert_ingredient = {
        recipe: this.name,
        ingredient: name,
        amount: amount,
      };
      call_recipe_upsert_ingredient(upsert_ingredient).then(() => {
        this.$emit('upsert_recipe_ingredient', upsert_ingredient);
      });
    },
    delete_ingredient(recipe_name: string, ingredient_name: string) {
      const ingredient = {
        recipe: recipe_name,
        ingredient: ingredient_name,
      };
      call_recipe_delete_ingredient(ingredient).then(() => {
        this.$emit('delete_recipe_ingredient', ingredient);
      });
    },
  },
});
</script>
