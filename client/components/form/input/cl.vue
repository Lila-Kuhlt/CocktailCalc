<template>
  <div class="flex items-center gap-x-2">
    <FormInput v-bind="$attrs" type="number" step="0.5" :min="0" :max="10000" />
    <span class="font-semibold">cl</span>
  </div>
</template>
