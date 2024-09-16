<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="text-primary-800 inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/40 px-3 py-2 text-sm font-semibold shadow-sm hover:bg-white/50 dark:bg-white/20 dark:hover:bg-white/30"
      >
        <slot />
        <ChevronDownIcon
          class="text-primary-800 -mr-1 h-5 w-5"
          aria-hidden="true"
        />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-32 origin-top-right divide-y divide-zinc-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-800 dark:text-white dark:ring-zinc-600"
      >
        <div class="py-1">
          <MenuItem v-slot="{ active }" v-for="item in items">
            <button
              @click="item.callback"
              :class="[
                active
                  ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-700 dark:text-zinc-300',
                'group flex w-full items-center px-4 py-2 text-sm',
              ]"
            >
              <component
                :is="item.icon()"
                class="mr-3 h-5 w-5 text-zinc-400 group-hover:text-zinc-500"
              />
              {{ item.label }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script lang="ts">
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';

export default defineComponent({
  components: {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    ChevronDownIcon,
  },
  props: {
    items: {
      type: Array<{
        icon: () => {};
        label: string;
        callback: () => {};
      }>,
      required: true,
    },
  },
});
</script>
