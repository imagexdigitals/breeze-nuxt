<!-- SpecificationDescriptionDetails.vue -->
<template>
  <div>
    <!-- Tabs -->
    <div class="flex border-b border-gray-300 overflow-x-auto">
      <button
        @click="activeTab = 'specification'"
        :class="['flex-1 py-2 text-center cursor-pointer font-medium', activeTab === 'specification' ? 'bg-nxtkartsecondaryBlue text-white font-semibold' : '']"
      >
        Specification
      </button>
      <button
        @click="activeTab = 'description'"
        :class="['flex-1 py-2 text-center cursor-pointer font-medium', activeTab === 'description' ? 'bg-nxtkartsecondaryBlue text-white font-semibold' : '']"
      >
        Description
      </button>
    </div>

    <!-- Tab Content with Transition -->
    <div class="p-4">
      <transition name="slide" mode="out-in">
        <div v-if="activeTab === 'specification'" key="specification">
          <ProductSpecification :specifications="specifications" :attachments="attachments" />
        </div>
        <div v-else-if="activeTab === 'description'" key="description">
          <ProductDescription :description="description" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ProductSpecification from './ProductSpecification.vue'; // Adjust the path as necessary
import ProductDescription from './ProductDescription.vue'; // Adjust the path as necessary

interface Props {
  specifications: any[]; // Adjust the type as necessary
  attachments: any[];   // Adjust the type as necessary
  description: string;
}

const props = defineProps<Props>();
const activeTab = ref('specification'); // Default active tab
</script>

<style scoped>
/* Transition styles */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
