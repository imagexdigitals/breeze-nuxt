<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col md:flex-row w-full bg-white pt-5 rounded-md p-3 md:p-6 md:pt-10 md:w-[90%]">
      <!-- Left Column: Larger width for logo and address -->
      <div class="w-full md:w-[25%] flex flex-col p-4 md:p-6">
        <div class="mb-4 flex justify-center md:justify-start">
          <!-- Place your logo here -->
          <NuxtImg src="/images/NxtKart_Logo.svg" alt="Logo" class="w-36 h-auto md:w-48" />
        </div>
        <div class="text-center md:text-left">
          <h3 class="font-bold">NxtKart</h3>
          <p>No. 59, Krishna Street, Gandhi Nagar,</p>
          <p>Perumathunallur, Guduvanchery</p>
          <p>Chennai, Tamil Nadu, 603202</p>
          <div class="flex justify-center md:justify-start space-x-4 mt-4">
            <!-- Social Icons -->
            <a href="#" aria-label="Facebook">
              <Icon name="logos:facebook" class="w-6 h-6 text-gray-700" />
            </a>
            <a href="#" aria-label="Instagram">
              <Icon name="skill-icons:instagram" class="w-6 h-6 text-gray-700" />
            </a>
            <a href="#" aria-label="Twitter">
              <Icon name="fa6-brands:square-x-twitter" class="w-6 h-6 text-gray-700" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Icon name="devicon:linkedin" class="w-6 h-6 text-gray-700" />
            </a>
          </div>
          <div class="flex flex-col space-y-2 mt-4">
            <!-- Email Icon -->
            <div class="flex justify-center md:justify-start items-center space-x-2">
              <a href="mailto:care@nxtkart.com" aria-label="Email" class="flex items-center space-x-2">
                <Icon name="fluent-emoji-flat:e-mail" class="w-6 h-6 text-gray-700" />
                <span class="text-sm font-medium text-nxtkartsecondaryBlue">care@nxtkart.com</span>
              </a>
            </div>
            <!-- WhatsApp Icon -->
            <div class="flex justify-center md:justify-start items-center space-x-2">
              <a href="https://wa.me/919487929592" aria-label="WhatsApp" target="_blank" class="flex items-center space-x-2">
                <Icon name="logos:whatsapp-icon" class="w-6 h-6 text-gray-700" />
                <span class="text-sm font-medium">+91 9487929592 (10am to 6pm)</span>
              </a>
            </div>
          </div>
          <div class="mt-5 flex justify-center md:justify-start">
            <NuxtImg src="/images/payment-method.svg" alt="Secure Payment" class="w-auto h-5 mt-4" />
          </div>
        </div>
      </div>
      <!-- Right Columns: Navigation and Newsletter -->
      <div class="w-full md:w-[75%] flex flex-col md:flex-row h-auto md:h-[230px]">
        <!-- Navigation Columns -->
        <div class="w-full md:w-3/4 flex flex-wrap">
          <div v-for="(column, index) in navigationColumns" :key="index" class="w-full md:w-1/3 p-4">
            <h3 class="font-semibold">{{ column.title }}</h3>
            <ul class="space-y-2 mt-3">
              <li class="hover:text-nxtkartsecondaryBlue" v-for="(link, linkIndex) in column.links" :key="linkIndex">
                <NuxtLink :to="link.url">{{ link.text }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <!-- Newsletter Section -->
        <div class="w-full md:w-[35%] p-4 border-t-8 md:border-t-0 md:border-l-8 border-red-600 bg-gray-100 flex flex-col justify-center">
          <h3 class="font-bold text-lg mb-2">RECEIVE THE HOTTEST NEWS AND PROMOTIONS.</h3>
          <p class="mb-4">Directly to your email</p>
          <form @submit.prevent="subscribeToNewsletter" class="flex flex-col space-y-2 w-full">
            <input type="email" placeholder="Enter your email" class="p-2 border border-gray-300 rounded-md focus:outline-none w-full" v-model="email" required />
            <button type="submit" class="bg-nxtkartsecondaryBlue text-white p-2 rounded-md hover:bg-nxtkartBlue focus:outline-none mt-2 w-full">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Trust Badges -->
    <div class="flex justify-center gap-6 flex-wrap py-2 mb-6 w-full md:w-[90%]">
      <div v-for="(badge, index) in trustBadges" :key="index" class="flex items-center space-x-2">
        <div class="bg-red-100 p-1.5 rounded-md flex items-center justify-center">
          <Icon :name="badge.icon" class="w-5 h-5 text-red-600" />
        </div>
        <span class="text-xs md:text-sm font-semibold text-gray-700">{{ badge.text }}</span>
      </div>
    </div>

    <div class="w-full bg-gray-100">
      <div class="flex flex-col md:flex-row justify-between items-center py-2 my-2 w-[90%] mx-auto">
        <!-- Left Side: Copyright Notice -->
        <div class="text-sm text-gray-700 text-center md:text-left">
          © {{ currentYear }} NxtKart. All rights reserved.
        </div>

        <!-- Right Side: Disclaimer -->
        <div class="text-sm text-gray-700 text-center md:text-right mt-2 md:mt-0">
          Product images are for reference only. Actual product specifications and colors may vary slightly.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Get the current year
const currentYear = ref(new Date().getFullYear());

// Define your navigation columns and links
const navigationColumns = [
  {
    title: 'Customer Support',
    links: [
      { url: '/link1', text: 'Contact us' },
      { url: '/link2', text: 'Track My Order' },
      { url: '/link3', text: 'FAQ' },
      { url: '/link4', text: 'Payment Methods' },
      { url: '/link5', text: 'My Account' }
    ]
  },
  {
    title: 'Legal Information',
    links: [
      { url: '/link6', text: 'Return & Refund' },
      { url: '/link7', text: 'Shipping Policy' },
      { url: '/link8', text: 'Privacy Policy' }
    ]
  },
  {
    title: 'NxtKart',
    links: [
      { url: '/link9', text: 'About NxtKart' },
      { url: '/link10', text: 'Careers' },
      { url: '/link11', text: 'Blog' }
    ]
  },
];

// Define your trust badges
const trustBadges = [
  { icon: 'tdesign:secured', text: 'Secure Payments' },
  { icon: 'ic:outline-support-agent', text: 'Great! Help Desk' },
  { icon: 'iconoir:wallet', text: 'Great Value' },
  { icon: 'ant-design:truck-outlined', text: 'Nationwide Delivery' }
];

// Email input state
const email = ref('');

// Function to handle newsletter subscription
const subscribeToNewsletter = () => {
  // Handle the subscription logic here
  console.log('Subscribing email:', email.value);
};
</script>

<style>
/* Your styles here */
</style>
