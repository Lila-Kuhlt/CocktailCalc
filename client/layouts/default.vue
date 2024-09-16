<template>
  <Body
    class="selection:bg-primary-100 dark:selection:bg-primary-800 bg-white text-secondary-900 dark:bg-secondary-900 dark:text-white"
  />
  <div class="flex h-screen flex-col justify-between">
    <LayoutNav />
    <main class="mb-auto">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>

<style scoped>
* {
  font-family: Montserrat, 'sans-serif';
}
</style>

<style>
a {
  @apply hover:underline;
}
</style>
