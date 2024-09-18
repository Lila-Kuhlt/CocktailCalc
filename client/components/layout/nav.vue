<template>
  <header>
    <nav>
      <div
        class="flex items-center justify-between bg-primary-400 p-5 dark:bg-primary-500"
      >
        <a class="text-3xl font-bold" href="/">CocktailCalc</a>

        <!-- desktop view -->
        <ul class="hidden items-center space-x-5 text-xl font-semibold sm:flex">
          <li v-for="page in pages" class="list-item">
            <a :href="page.href">{{ page.title }}</a>
          </li>
          <li>
            <SettingTheme />
          </li>
        </ul>

        <!-- mobile view -->
        <button
          class="block rounded-md p-1 hover:bg-primary-300 dark:hover:bg-primary-600 sm:hidden"
          @click="$refs.mobile_nav.show()"
        >
          <Bars3Icon class="w-8 text-secondary-900 dark:text-white" />
        </button>
        <Modal ref="mobile_nav" hide_close place_top>
          <div class="flex flex-row-reverse items-center justify-between">
            <button
              aria-label="Close menu"
              class="-m-1 p-1"
              @click="$refs.mobile_nav.hide()"
            >
              <XMarkIcon
                class="h-6 w-6 text-secondary-500 dark:text-secondary-400"
              />
            </button>
            <h2
              class="text-sm font-medium text-secondary-600 dark:text-secondary-400"
            >
              Navigation
            </h2>
          </div>
          <nav class="mt-6">
            <ul
              class="-my-2 divide-y divide-secondary-100 text-base text-secondary-800 dark:divide-secondary-100/5 dark:text-secondary-300"
            >
              <li v-for="page in pages" :key="page.title">
                <nuxt-link
                  class="block p-2 hover:bg-secondary-200 dark:hover:bg-secondary-800"
                  :href="page.href"
                  @click="$refs.mobile_nav.hide()"
                >
                  {{ page.title }}
                </nuxt-link>
              </li>
            </ul>
            <div class="mt-5 flex justify-end">
              <SettingTheme
                class="rounded-md bg-primary-200 dark:bg-primary-600"
              />
            </div>
          </nav>
        </Modal>
      </div>
      <div class="h-1 bg-primary-500 px-1 dark:bg-primary-400" />
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';

const pages = [
  { title: 'Events', href: '/' },
  { title: 'Rezepte', href: '/recipes' },
  { title: 'Zutaten', href: '/ingredients' },
];
</script>
