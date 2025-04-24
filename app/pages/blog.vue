<template>
  <div class="bg-gray-100 md:py-6">
    <div class="mx-auto w-full md:w-4/5 py-5 space-y-5">
      <!-- First Section -->
      <div class="bg-white flex flex-col md:flex-row items-center md:rounded-md p-5 shadow-md">
        <!-- Left Column -->
        <div class="md:p-6 md:w-1/2">
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-red-600">Blog</h2>
          <p class="font-semibold text-lg mb-4">Stay Updated with the Latest from Nxt Kart</p>
          <p class="text-gray-700">
            Welcome to the Nxt Kart blog. Here, we share insights, updates, and stories about e-commerce, innovation, and more.
          </p>
        </div>
        <!-- Right Column -->
        <div class="md:w-1/2 p-4 md:p-6 flex justify-center md:justify-end mt-4 md:mt-0">
          <NuxtImg src="/images/blog.svg" alt="Blog Image" class="w-[250px] h-auto"></NuxtImg>
        </div>
      </div>

      <!-- Blog Posts Section -->
      <div class="flex flex-col md:flex-row md:justify-center gap-4">
        <div class="w-full bg-white p-4 md:p-6 md:rounded-md shadow-md">
          <h3 class="text-xl font-semibold mb-3">Latest Blog Posts</h3>
          <div v-if="blogs.length > 0" class="space-y-4">
            <div v-for="blog in blogs" :key="blog.title" class="p-4 border border-gray-200 rounded-md">
              <h4 class="text-lg font-semibold">{{ blog.title }}</h4>
              <p class="text-gray-700">{{ blog.excerpt }}</p>
              <div class="flex items-center space-x-4 mt-2">
                <div class="flex items-center space-x-1">
                  <Icon name="mingcute:calendar-line" class="w-5 h-5 text-gray-700" />
                  <span>{{ blog.date }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Icon name="mingcute:user-line" class="w-5 h-5 text-gray-700" />
                  <span>{{ blog.author }}</span>
                </div>
              </div>
              <button @click="openBlog(blog)" class="text-red-600 mt-2 inline-block">Read More</button>
            </div>
          </div>
          <div v-else class="p-4 text-gray-700 text-center">
            No blogs available at the moment. Stay tuned for updates!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const blogs = ref([
  // Example blog posts
  // {
  //   title: 'Blog Post Title',
  //   excerpt: 'A brief excerpt of the blog post.',
  //   date: '2023-10-01',
  //   author: 'Author Name',
  //   content: 'Full content of the blog post.'
  // }
]);

const openBlog = (blog) => {
  // Logic to open or navigate to the full blog post
  console.log('Open blog:', blog.title);
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
