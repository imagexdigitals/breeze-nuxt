<template>
  <header class="border-b sticky top-0 z-50 bg-white">
    <div class="flex items-center justify-between p-2 text-gray-800 mx-auto w-full gap-4">
      <div class="flex items-center space-x-2">
        <!-- Hamburger Menu -->
        <button @click="toggleMenu" class="text-gray-700 focus:outline-none">
          <Icon name="ic:baseline-menu" class="w-8 h-8" />
        </button>
        <!-- Logo -->
        <NuxtLink to="/" @click="toggleMenu">
          <NuxtImg src="/images/NxtKart_Logo.svg" alt="NxtKart Logo" width="150" height="97" />
        </NuxtLink>
      </div>

      <!-- Right Side Components -->
      <div class="flex items-center space-x-2">
        <!-- My Account Icon -->
        <NuxtLink to="/login" @click="toggleMenu"
          class="font-medium text-gray-700 flex space-x-2 items-center cursor-pointer hover:bg-zinc-100 p-1.5 border-white border hover:border-dashed hover:border-nxtkartsecondaryBlue hover:border hover:rounded-md hover:text-nxtkartsecondaryBlue">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="mr-1">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </g>
          </svg>
        </NuxtLink>
        <!-- Cart Icon -->
        <HeaderCart />
      </div>
    </div>

    <!-- Bottom Search Bar -->
    <div class="pb-2 w-full">
      <!-- Search Bar -->
      <HeaderSearchBar />
    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div v-if="isMenuOpen" class="fixed inset-0 bg-white z-40 flex flex-col">
        <div class="flex justify-between items-center p-4 border-b">
          <button v-if="menuStack.length > 1" @click="goBack" class="text-gray-700 focus:outline-none">
            <Icon name="ic:baseline-arrow-back" class="w-8 h-8" />
          </button>
          <button v-else @click="toggleMenu" class="text-gray-700 focus:outline-none">
            <Icon name="ic:baseline-close" class="w-8 h-8" />
          </button>
          <h2 class="text-lg font-semibold flex-1 text-center">{{ currentMenu.name || 'All Categories' }}</h2>
        </div>
        <div class="flex-1 overflow-y-auto">
          <ul>
            <li v-for="(item, index) in currentMenu.children" :key="index" class="px-4 py-2 border-b hover:bg-gray-100">
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
  </header>
</template>

<script lang="ts" setup>
import { NuxtImg } from '#components';
import { ref, reactive, computed, onMounted } from 'vue';
const sanctumFetch = useSanctumClient();
const isMenuOpen = ref(false);
const menuStack = ref<any[]>([]);
const categories = ref<any[]>([]);

// Fetch categories from API
const fetchCategories = async () => {
  try {
    const response = await sanctumFetch(`/api/categories`, {
      method: 'GET',
    });
    categories.value = response;
    
    // Initialize menu structure with API data
    menuStructure.children = categories.value;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

onMounted(() => {
  fetchCategories();
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

// Main menu structure that will be populated with API data
const menuStructure = reactive({
  name: 'All Categories',
  children: [] as any[]
});

const currentMenu = computed(() => {
  return menuStack.value[menuStack.value.length - 1] || menuStructure;
});

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