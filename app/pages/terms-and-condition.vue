<template>
  <div class="bg-gray-100 md:py-6">
    <div class="mx-auto w-full md:w-4/5 py-5 space-y-5">
      <!-- Terms and Conditions Section -->
      <div class="bg-white flex flex-col md:flex-row items-center md:rounded-md p-5 shadow-md">
        <!-- Left Column -->
        <div class="md:p-6 md:w-1/2">
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-red-600">Terms and Conditions</h2>
          <p class="font-semibold text-lg mb-4">Understanding Our Terms</p>
          <p class="text-gray-700">
            Welcome to Nxt Kart. These terms and conditions outline the rules and regulations for the use of our website and services.
          </p>
        </div>
        <!-- Right Column -->
        <div class="md:w-1/2 p-4 md:p-6 flex justify-center md:justify-end mt-4 md:mt-0">
          <NuxtImg src="/images/terms-conditions.svg" alt="Terms and Conditions Image" class="w-[250px] h-auto"></NuxtImg>
        </div>
      </div>

      <!-- Dynamic Terms and Conditions Sections -->
      <div v-for="(section, index) in termsAndConditionsSections" :key="index" class="bg-white p-4 md:p-6 md:rounded-md shadow-md w-full mx-auto mt-4">
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

const termsAndConditionsSections = ref([
  {
    title: 'Acceptance of Terms',
    description: 'By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.',
    subSections: [
      {
        title: 'Eligibility',
        content: 'You must be at least 18 years old to use our services. By using our services, you represent and warrant that you have the legal capacity to enter into a binding agreement.'
      },
      {
        title: 'Changes to Terms',
        content: 'We reserve the right to modify these terms at any time. It is your responsibility to review them regularly.'
      }
    ]
  },
  {
    title: 'User Accounts',
    description: 'To access certain features of our services, you may need to create an account.',
    subSections: [
      {
        title: 'Account Creation',
        content: 'You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials.'
      },
      {
        title: 'Account Termination',
        content: 'We may terminate or suspend your account if you violate these terms or any applicable laws.'
      }
    ]
  },
  {
    title: 'Products and Services',
    description: 'We offer a variety of products and services through our website.',
    subSections: [
      {
        title: 'Product Descriptions',
        content: 'We attempt to be as accurate as possible in our product descriptions. However, we do not warrant that product descriptions or other content on our website are accurate, complete, reliable, current, or error-free.'
      },
      {
        title: 'Pricing and Availability',
        content: 'Prices and availability of products are subject to change without notice.'
      }
    ]
  },
  {
    title: 'Orders and Payments',
    description: 'By placing an order, you agree to pay the applicable fees and charges.',
    subSections: [
      {
        title: 'Order Processing',
        content: 'We will process your order upon receipt of payment. You will receive an order confirmation email with the details of your order.'
      },
      {
        title: 'Payment Methods',
        content: 'We accept various payment methods, including credit/debit cards, net banking, and digital wallets. All payments are processed securely by our third-party payment gateway partners.'
      }
    ]
  },
  {
    title: 'Shipping and Delivery',
    description: 'We ship products to locations within India.',
    subSections: [
      {
        title: 'Shipping Costs',
        content: 'Shipping costs are calculated based on the product quantity, weight, size, and delivery location.'
      },
      {
        title: 'Delivery Times',
        content: 'Estimated delivery times are provided during checkout. However, delivery times may vary based on your location and product availability.'
      }
    ]
  },
  {
    title: 'Returns and Refunds',
    description: 'Our return and refund policy is designed to ensure your satisfaction.',
    subSections: [
      {
        title: 'Return Policy',
        content: 'You may return eligible products within certain days of delivery. The product must be in its original condition and packaging. check our return and refund policy for more details.'
      },
      {
        title: 'Refund Process',
        content: 'Refunds will be processed to the original payment method within 5 to 7 business days after we receive the returned product and verify its condition.'
      }
    ]
  },
  {
    title: 'Intellectual Property',
    description: 'All content on our website, including text, graphics, logos, and images, is the property of Nxt Kart and is protected by intellectual property laws.',
    subSections: []
  },
  {
    title: 'Limitation of Liability',
    description: 'We will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with these terms.',
    subSections: []
  },
  {
    title: 'Governing Law',
    description: 'These terms and conditions are governed by and construed in accordance with the laws of India.',
    subSections: []
  },
  {
    title: 'Contact Us',
    description: 'If you have any questions or concerns about these terms and conditions, please contact us at:',
  }
]);
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
