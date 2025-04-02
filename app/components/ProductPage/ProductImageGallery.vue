<template>
  <div class="w-2/5">
    <!-- Main Image -->
    <div class="relative w-full pt-[100%] overflow-hidden">
      <NuxtImg
        :src="currentImage"
        :alt="altText"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        @click="openModal(currentImage)"
      />
    </div>
    <!-- Gallery Images -->
    <div v-if="galleryWithMain.length" class="mt-4">
      <div class="grid grid-cols-6 gap-2">
        <div
          v-for="(img, index) in galleryWithMain"
          :key="index"
          class="relative w-full pt-[100%] overflow-hidden"
        >
          <NuxtImg
            :src="img"
            :alt="`${altText} - Image ${index + 1}`"
            class="absolute inset-0 w-full h-full object-cover cursor-pointer border-2 p-1"
            :class="{ 'border-blue-500': img === currentImage }"
            @mouseover="changeMainImage(img)"
            @click="openModal(img)"
          />
        </div>
      </div>
    </div>

    <!-- Modal Structure -->
    <div v-if="isModalOpen" class="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75 z-50">
      <div class="max-w-full max-h-full p-4 bg-white rounded-md overflow-hidden flex flex-col items-center relative">
        <button @click="closeModal" class="absolute top-3 right-3 text-red-600 hover:text-red-700">
          <Icon name="fontisto:close" class="w-6 h-6"/>
        </button>
        <div class="w-full max-h-[70vh] overflow-hidden mb-4 flex items-center justify-center">
          <NuxtImg
            v-if="modalImage"
            :src="modalImage"
            :alt="altText"
            class="max-w-full max-h-full object-contain"
          />
        </div>
        <div class="w-full overflow-x-auto flex space-x-2 items-center justify-center">
          <div
            v-for="(img, index) in galleryWithMain"
            :key="index"
            class="flex-shrink-0 w-20 h-20 overflow-hidden"
          >
            <NuxtImg
              :src="img"
              :alt="`${altText} - Image ${index + 1}`"
              class="w-full h-full object-cover cursor-pointer border-2 p-1"
              :class="{ 'border-blue-500': img === modalImage }"
              @click="updateModalImage(img)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const props = defineProps<{
  image: string;
  altText?: string;
  gallery: string[];
}>();

const currentImage = ref(props.image);
const isModalOpen = ref(false);
const modalImage = ref<string | undefined>(undefined);

const galleryWithMain = computed(() => [props.image, ...props.gallery]);

const changeMainImage = (img: string) => {
  currentImage.value = img;
};

const openModal = (img: string) => {
  modalImage.value = img;
  isModalOpen.value = true;
};

const closeModal = () => {
  modalImage.value = undefined;
  isModalOpen.value = false;
};

const updateModalImage = (img: string) => {
  modalImage.value = img;
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
