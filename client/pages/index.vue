<template>
  <LayoutSection>
    <LayoutPageTitle>Events</LayoutPageTitle>
    <ButtonToggle ref="add_event_toggle" button_text="Event hinzufügen">
      <form @submit.prevent="add_event" class="flex items-center space-x-2">
        <FormInput placeholder="Eventname" name="name" required />
        <ButtonPlus type="submit" />
        <ButtonMinus @click="hide_add_event" />
      </form>
    </ButtonToggle>

    <LayoutGrid>
      <CardEvent
        v-for="event in events"
        :key="event.name"
        :name="event.name"
        :price="event.price"
        :recipes="event.recipes"
        @update_price="update_price"
        @delete_event="delete_event"
        @upsert_event_recipe="upsert_event_recipe"
        @delete_event_recipe="delete_event_recipe"
      />
    </LayoutGrid>
  </LayoutSection>
</template>

<script lang="ts">
type Event = {
  name: string;
  price: number;
  recipes: Array<{
    name: string;
    amount: number;
  }>;
};

export default defineComponent({
  setup() {
    const events: Array<Event> = ref([]);

    call_event_get_many().then((data) => {
      events.value = data;
    });

    return {
      events,
    };
  },
  methods: {
    async update_price(name: string, price: string) {
      const event = this.find_event(name);
      if (event) {
        event.price = price;
      }
    },
    add_event(e: Event) {
      const form = e.target as HTMLFormElement;
      const form_data = new FormData(form);
      const event_name = form_data.get('name') as string;
      call_event_upsert(event_name).then(() => {
        const event = this.find_event(event_name);
        if (!event) {
          this.events.push({ name: event_name, price: 0.0, recipes: [] });
        }
        this.$refs.add_event_toggle.hide();
      });
    },
    delete_event(event_name: string) {
      this.filter_event(event_name);
    },
    upsert_event_recipe(upsert_recipe: {
      event: string;
      recipe: string;
      amount: number;
    }) {
      const event = this.find_event(upsert_recipe.event);
      if (event) {
        const recipe = event.recipes.find(
          (recipe) => recipe.name === upsert_recipe.recipe,
        );
        if (recipe) {
          recipe.amount = upsert_recipe.amount;
        } else {
          event.recipes.push({
            name: upsert_recipe.recipe,
            amount: upsert_recipe.amount,
          });
        }
      }
    },
    delete_event_recipe(delete_recipe: { event: string; recipe: string }) {
      this.filter_event_recipe(delete_recipe.event, delete_recipe.recipe);
    },
    find_event(event_name: string) {
      return this.events.find((event) => event.name === event_name);
    },
    filter_event(event_name: string) {
      this.events = this.events.filter((event) => event.name !== event_name);
    },
    filter_event_recipe(event_name: string, recipe_name: string) {
      const event = this.find_event(event_name);
      if (event) {
        event.recipes = event.recipes.filter(
          (recipe) => recipe.name !== recipe_name,
        );
      }
    },
    hide_add_event() {
      this.$refs.add_event_toggle.hide();
    },
  },
});
</script>
