<template>
  <div class="flex items-center gap-x-2">
    <FormInput
      v-bind="$attrs"
      type="number"
      step="0.01"
      :min="0"
      :max="1000000"
    />
    <span class="font-semibold">€/L</span>
  </div>
</template>
