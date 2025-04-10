<template>
  <div class="py-2 border-b flex justify-between items-center relative">
    <!-- Breadcrumbs on the left -->
    <ProductPageProductBreadcrumbs :breadcrumbs="breadcrumbs" />

    <!-- Share button with dropdown -->
    <div class="relative mr-1.5 md:mr-3">
      <button @click="toggleDropdown" class="text-green-600 hover:text-secondaryBlue text-xl flex items-center space-x-1">
        <span class="text-sm text-gray-700 font-semibold">Share</span>
        <Icon name="tdesign:share-filled" />
      </button>

      <!-- Dropdown for social icons -->
      <div v-if="isDropdownOpen" class="absolute right-0 mt-2 bg-green-100 border rounded-b-[10px] shadow-lg z-10 flex space-x-1 p-1">
        <a :href="whatsappShareUrl" target="_blank" class="text-gray-800 hover:bg-white p-2 rounded-lg flex items-center justify-center text-xl">
          <Icon name="logos:whatsapp-icon" />
        </a>
        <a :href="instagramShareUrl" target="_blank" class="text-gray-800 hover:bg-white p-2 rounded-lg flex items-center justify-center text-xl">
          <Icon name="skill-icons:instagram" />
        </a>
        <a :href="facebookShareUrl" target="_blank" class="text-gray-800 hover:bg-white p-2 rounded-lg flex items-center justify-center text-xl">
          <Icon name="logos:facebook" />
        </a>
        <a :href="twitterShareUrl" target="_blank" class="text-gray-800 hover:bg-white p-2 rounded-lg flex items-center justify-center text-xl">
          <Icon name="fa6-brands:square-x-twitter" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

interface Breadcrumb {
  name: string;
  url: string;
}

interface Props {
  breadcrumbs: Breadcrumb[];
}

const props = defineProps<Props>();
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (event: MouseEvent) => {
  const shareButton = document.querySelector('.relative button');
  const dropdown = document.querySelector('.relative .absolute');
  if (shareButton && !shareButton.contains(event.target as Node) && dropdown && !dropdown.contains(event.target as Node)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});

const currentUrl = computed(() => window.location.href);

const whatsappShareUrl = computed(() => `https://wa.me/?text=${encodeURIComponent(currentUrl.value)}`);
const instagramShareUrl = computed(() => `https://www.instagram.com/?url=${encodeURIComponent(currentUrl.value)}`);
const facebookShareUrl = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl.value)}`);
const twitterShareUrl = computed(() => `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl.value)}`);
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
