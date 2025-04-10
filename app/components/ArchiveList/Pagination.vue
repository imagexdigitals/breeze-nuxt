<!-- Pagination.vue -->
<template>
  <div class="flex justify-center mt-4 space-x-2">
    <button v-for="page in pages" :key="page" @click="goToPage(page)" :class="[
      'border',
      'rounded-full',
      'w-10',
      'h-10',
      'flex',
      'items-center',
      'justify-center',
      currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
    ]">
      {{ page }}
    </button>
    <span v-if="totalPages > 5" class="mx-2">...</span>
    <button v-if="totalPages > 5" @click="goToPage(totalPages)"
      :class="[
        'border',
        'rounded-full',
        'w-10',
        'h-10',
        'flex',
        'items-center',
        'justify-center',
        currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
      ]">
      {{ totalPages }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const router = useRouter();

const pages = computed(() => {
  const totalPages = props.totalPages;
  const current = props.currentPage;
  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, 5);
    } else if (current >= totalPages - 2) {
      pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(current - 2, current - 1, current, current + 1, current + 2);
    }
  }

  return pages;
});

const goToPage = (page: number) => {
  router.push({ query: { ...router.currentRoute.value.query, page } });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>
