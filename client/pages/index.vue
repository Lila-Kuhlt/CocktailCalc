<template>
  <h1 :class="caskldjfh" @click="changeArray">{{ msg }}</h1>
  <p v-if="show">asdkljfh</p>
  <ul>
    <li v-for="item in arr" :key="item">{{ item }}</li>
  </ul>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const caskldjfh = 'dark:text-white text-secondary-200';
    const msg = 'Hello World';
    const show = false;
    const arr = ref([1, 2, 3]);
    return { caskldjfh, msg, show, arr };
  },
  methods: {
    changeArray() {
      this.arr.push(4);
    },
  },
});
</script>

<style scoped></style>
