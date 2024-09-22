<template>
  <Card @delete="delete_event">
    <div class="flex h-full flex-col items-center justify-between gap-y-2">
      <CardTitle :title="name" />
      <ul class="mt-2 flex w-full flex-grow flex-col justify-between gap-y-1">
        <li v-for="recipe in recipes" :key="recipe.name">
          <form class="flex items-center gap-x-3">
            <LayoutItemTitle :title="recipe.name" />
            <FormInputAmount
              class="w-16"
              :value="recipe.amount"
              name="amount"
              required
              @focusout="
                upsert_recipe(recipe.name, Number($event.target.value))
              "
            />
            <ButtonMinus
              type="button"
              @click="delete_recipe(recipe.name)"
              class="ml-4"
              title="Rezept entfernen"
            />
          </form>
        </li>
        <li class="mt-auto">
          <LayoutLineSeparator class="my-3" title="Rezept hinzufügen" />
          <div>
            <form @submit.prevent="add_recipe" class="flex gap-x-3">
              <SelectItems :options="recipes_many" name="recipe"></SelectItems>
              <FormInputAmount class="w-16" value="0" name="amount" required />
              <ButtonPlus
                class="ml-4"
                type="submit"
                title="Rezept hinzufügen"
              />
            </form>
          </div>
        </li>
      </ul>
    </div>
  </Card>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const recipes_many: Array<string> = ref([]);

    call_recipe_get_many().then((data) => {
      recipes_many.value = data.map((recipe) => recipe.name);
    });

    return {
      recipes_many,
    };
  },
  emits: ['delete_event', 'upsert_event_recipe', 'delete_event_recipe'],
  props: {
    name: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array<{ name: string; amount: number }>,
      required: true,
    },
  },
  methods: {
    delete_event() {
      call_event_delete(this.name).then(() => {
        this.$emit('delete_event', this.name);
      });
    },
    add_recipe(e: Event) {
      const form = e.target as HTMLFormElement;
      const form_data = new FormData(form);
      const recipe_name = form_data.get('recipe') as string | null;
      const recipe_amount = parseFloat(form_data.get('amount') as string);
      if (recipe_name === null || isNaN(recipe_amount)) return;
      const upsert_recipe = {
        event: this.name,
        recipe: recipe_name,
        amount: recipe_amount,
      };

      call_event_upsert_recipe(upsert_recipe).then(() => {
        this.$emit('upsert_event_recipe', upsert_recipe);
      });
    },
    upsert_recipe(name: string, amount: number) {
      const upsert_recipe = {
        event: this.name,
        recipe: name,
        amount: amount,
      };
      call_event_upsert_recipe(upsert_recipe).then(() => {
        this.$emit('upsert_event_recipe', upsert_recipe);
      });
    },
    delete_recipe(recipe_name: string) {
      const delete_recipe = {
        event: this.name,
        recipe: recipe_name,
      };
      call_event_delete_recipe(delete_recipe).then(() => {
        this.$emit('delete_event_recipe', delete_recipe);
      });
    },
  },
});
</script>
