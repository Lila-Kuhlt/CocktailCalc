<template>
  <div>
    <ButtonBig v-if="!toggled" @click="show">{{ button_text }}</ButtonBig>
    <slot v-else />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    return {
      toggled: ref(false),
    };
  },
  props: {
    button_text: {
      type: String,
      default: 'Click me',
    },
  },
  methods: {
    show() {
      this.toggled = true;
    },
    hide() {
      this.toggled = false;
    },
  },
});
</script>
