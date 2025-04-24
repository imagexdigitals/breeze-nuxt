<template>
  <div class="bg-gray-100 md:py-6">
    <div class="mx-auto w-full md:w-4/5 py-5 space-y-5">
      <!-- Shipping Policy Section -->
      <div class="bg-white flex flex-col md:flex-row items-center md:rounded-md p-5 shadow-md">
        <!-- Left Column -->
        <div class="md:p-6 md:w-1/2">
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-red-600">Shipping Policy</h2>
          <p class="font-semibold text-lg mb-4">Efficient and Reliable Shipping</p>
          <p class="text-gray-700">
            At Nxt Kart, we strive to provide efficient and reliable shipping services to ensure your purchases reach you promptly and securely.
          </p>
        </div>
        <!-- Right Column -->
        <div class="md:w-1/2 p-4 md:p-6 flex justify-center md:justify-end mt-4 md:mt-0">
          <NuxtImg src="/images/shipping-policy.svg" alt="Shipping Policy Image" class="w-[250px] h-auto"></NuxtImg>
        </div>
      </div>

      <!-- Dynamic Shipping Policy Sections -->
      <div v-for="(section, index) in shippingPolicySections" :key="index" class="bg-white p-4 md:p-6 md:rounded-md shadow-md w-full mx-auto mt-4">
        <h3 class="text-xl font-semibold mb-3">{{ index + 1 }}. {{ section.title }}</h3>
        <p class="text-gray-800 mb-4">{{ section.description }}</p>

        <div v-for="(subSection, subIndex) in section.subSections" :key="subIndex" class="mb-4">
          <h4 class="text-lg font-semibold mb-2">{{ index + 1 }}.{{ subIndex + 1 }} {{ subSection.title }}</h4>
          <p class="text-gray-800 mb-4">{{ subSection.content }}</p>
        </div>

        <ul v-if="section.list" class="list-decimal list-inside text-gray-800 mb-4">
          <li v-for="(item, itemIndex) in section.list" :key="itemIndex">{{ item }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const shippingPolicySections = ref([
  {
    title: 'General Shipping Information',
    description: 'Once an order is shipped, cancellation is not allowed.',
    subSections: [
      {
        title: 'Shipping Availability',
        content: 'Shipping is subject to availability and depends on the pincode and location. We cover most pincodes across India.'
      },
      {
        title: 'Shipping Costs',
        content: 'Shipping costs vary depending on the product quantity, weight, and size.'
      }
    ]
  },
  {
    title: 'Delivery Timelines',
    description: 'Delivery timelines may vary based on the destination and product availability.',
    subSections: [
      {
        title: 'Estimated Delivery Time',
        content: 'We strive to deliver your orders within 5-10 business days. However, delivery times may vary based on your location and product availability.'
      },
      {
        title: 'Tracking Your Order',
        content: 'You will receive a tracking number once your order is shipped. You can use this number to track your order on our website or through the courier\'s tracking service.'
      }
    ]
  },
  {
    title: 'International Shipping',
    description: 'Currently, we do not offer international shipping. Our services are limited to India.',
    subSections: []
  },
  {
    title: 'Handling and Packaging',
    description: 'We ensure that your products are securely packaged to prevent damage during transit.',
    subSections: [
      {
        title: 'Packaging Standards',
        content: 'Our packaging standards are designed to protect your items during shipping. If you receive a damaged product, please contact our customer support immediately.'
      }
    ]
  },
  {
    title: 'Additional Information',
    description: 'For any further inquiries regarding our shipping policy, please contact our customer support team.',
    list: [
      'Ensure your shipping address is correct and complete to avoid delays.',
      'If you are not available at the time of delivery, our courier partner may attempt redelivery or hold the package at a nearby facility.',
      'Please note that certain products may have additional shipping restrictions or requirements.'
    ]
  }
]);
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
