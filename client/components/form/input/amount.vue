<template>
  <div class="flex items-center gap-x-2">
    <FormInput v-bind="$attrs" type="number" step="1" :min="0" :max="10000" />
    <span class="font-semibold">#</span>
  </div>
</template>
