<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10 break-words" @close="hide()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-900 dark:bg-opacity-75"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          :class="[
            'flex min-h-full justify-center p-4 text-center sm:p-0',
            place_top ? 'items-start' : 'items-end sm:items-center',
          ]"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative w-full transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all dark:bg-gray-900 dark:text-white sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <slot />
              <div v-if="!hide_close" class="mt-5 sm:mt-6">
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 dark:bg-gray-800"
                  @click="hide()"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ElementModal',
  components: {
    Dialog,
    DialogPanel,
    TransitionChild,
    TransitionRoot,
  },
  props: {
    place_top: {
      type: Boolean,
      default: false,
    },
    hide_close: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      open: ref(false),
    };
  },
  methods: {
    show() {
      this.open = true;
    },
    hide() {
      this.open = false;
    },
  },
});
</script>
