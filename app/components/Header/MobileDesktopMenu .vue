<template>
  <transition name="slide">
    <div v-if="isMenuOpen" class="fixed inset-0 bg-white z-40 flex flex-col md:w-96">
      <div class="flex justify-between items-center px-4 py-2 border-b bg-nxtkartsecondaryBlue text-white">
        <button v-if="menuStack.length > 1" @click="goBack" class="text-white focus:outline-none">
          <Icon name="mingcute:arrow-left-line" class="w-6 h-6 mt-2" />
        </button>
        <button v-else @click="toggleMenu" class="text-white focus:outline-none">
          <Icon name="material-symbols:close" class="w-6 h-6 mt-2" />
        </button>
        <h2 class="text-lg font-semibold flex-1 ml-3">{{ currentMenu.name || 'All Categories' }}</h2>
      </div>
      <div class="flex-1 overflow-y-auto">
        <ul>
          <li v-for="(item, index) in currentMenu.children" :key="index" class="px-4 py-3 border-b hover:bg-gray-100">
            <div v-if="item.children && item.children.length > 0" @click="openSubMenu(item)" class="flex items-center justify-between cursor-pointer hover:text-nxtkartsecondaryBlue">
              <div class="flex items-center space-x-3">
                <NuxtImg v-if="item.image" :src="item.image" :alt="item.name" class="w-12 h-12 object-cover" />
                <span>{{ item.name }}</span>
              </div>
              <Icon name="ic:baseline-chevron-right" class="w-5 h-5" />
            </div>
            <NuxtLink v-else :to="`/category/${item.slug}`" @click="toggleMenu" class="flex items-center justify-between hover:text-nxtkartsecondaryBlue">
              <div class="flex items-center space-x-3">
                <NuxtImg v-if="item.image" :src="item.image" :alt="item.name" class="w-12 h-12 object-cover" />
                <span>{{ item.name }}</span>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </transition>
  <div v-if="isMenuOpen" class="fixed inset-0 bg-gray-900 opacity-50 z-30"></div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch } from 'vue';
import { useCategories } from '@/composables/useCategories'; // Adjust the import path as needed

const { categories } = useCategories();
const isMenuOpen = ref(false);
const menuStack = ref<any[]>([]);

const menuStructure = reactive({
  name: 'All Categories',
  children: categories,
});

const currentMenu = computed(() => {
  return menuStack.value[menuStack.value.length - 1] || menuStructure;
});

const toggleMenu = () => {
  if (isMenuOpen.value) {
    menuStack.value = []; // Reset menu stack when closing
  } else {
    // Initialize with the main menu structure
    menuStack.value.push(menuStructure);
  }
  isMenuOpen.value = !isMenuOpen.value;
};

const openSubMenu = (item: any) => {
  if (item.children && item.children.length > 0) {
    menuStack.value.push(item);
  }
};

const goBack = () => {
  if (menuStack.value.length > 1) {
    menuStack.value.pop();
  }
};

// Expose the toggleMenu function to the parent component
defineExpose({
  toggleMenu,
});
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
