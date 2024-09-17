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
        :recipes="event.recipes"
        @delete_event="delete_event"
        @upsert_event_recipe="upsert_event_recipe"
        @delete_event_recipe="delete_event_recipe"
      />
    </LayoutGrid>
  </LayoutSection>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const events: Array<{
      name: string;
      recipes: [{ name: string; amount: number }];
    }> = ref([]);

    call_event_get_many().then((data) => {
      events.value = data;
    });

    return {
      events,
    };
  },
  methods: {
    add_event(e: Event) {
      const form = e.target as HTMLFormElement;
      const form_data = new FormData(form);
      const event_name = form_data.get('name') as string;
      call_event_upsert(event_name).then(() => {
        this.events.push({ name: event_name, recipes: [] });
        this.$refs.add_event_toggle.hide();
      });
    },
    delete_event(event_name: string) {
      this.events = this.events.filter((events) => events.name !== event_name);
    },
    upsert_event_recipe(upsert_recipe: {
      event: string;
      recipe: string;
      amount: number;
    }) {
      console.log(upsert_recipe);
      const event = this.events.find(
        (event) => event.name === upsert_recipe.event,
      );
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
      const event = this.events.find(
        (event) => event.name === delete_recipe.event,
      );
      if (event) {
        event.recipes = event.recipes.filter(
          (recipe) => recipe.name !== delete_recipe.recipe,
        );
      }
    },
    hide_add_event() {
      this.$refs.add_event_toggle.hide();
    },
  },
});
</script>
