<template>
  <Dropdown
    :items="[
      {
        label: 'Hell',
        callback: () => settings.setTheme('light'),
        icon: SunIcon,
      },
      {
        label: 'Dunkel',
        callback: () => settings.setTheme('dark'),
        icon: MoonIcon,
      },
      {
        label: 'System',
        callback: () => settings.setTheme('system'),
        icon: ComputerDesktopIcon,
      },
    ]"
  >
    <SunIcon
      v-if="settings.theme === 'light'"
      class="text-primary-800 h-5 w-5"
      aria-hidden="true"
    />
    <MoonIcon
      v-else-if="settings.theme === 'dark'"
      class="text-primary-800 h-5 w-5"
      aria-hidden="true"
    />
    <ComputerDesktopIcon
      v-else
      class="text-primary-800 h-5 w-5"
      aria-hidden="true"
    />
  </Dropdown>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from '@heroicons/vue/24/outline';
import { settingsStore } from '~/store/settings';

export default defineComponent({
  methods: { ComputerDesktopIcon, MoonIcon, SunIcon },
  components: {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
  },
  setup() {
    return {
      settings: settingsStore(),
    };
  },
});
</script>
