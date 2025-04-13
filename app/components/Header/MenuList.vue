<template>
  <ul>
    <li v-for="(item, index) in items" :key="index" class="px-4 py-2 border-b">
      <div @click="navigate(item)" class="flex justify-between items-center cursor-pointer">
        <span>{{ item.name }}</span>
        <Icon v-if="item.children" name="ic:baseline-chevron-right" class="w-5 h-5" />
      </div>
      <!-- Recursively render child menus -->
      <transition name="fade">
        <MenuList v-if="item.open" :items="item.children" @navigate="navigate" />
      </transition>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  items: Array<{
    name: string;
    children?: Array<{ name: string; children?: any }>;
    open?: boolean;
  }>;
}>();

const emit = defineEmits<{
  (e: 'navigate', item: any): void;
}>();

const navigate = (item: any) => {
  if (item.children) {
    // Toggle the open state
    item.open = !item.open;
  }
  emit('navigate', item);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
