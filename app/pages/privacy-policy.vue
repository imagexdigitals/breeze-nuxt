<template>
  <div class="bg-gray-100 md:py-6">
    <div class="mx-auto w-full md:w-4/5 py-5 space-y-5">
      <!-- Privacy Policy Section -->
      <div class="bg-white flex flex-col md:flex-row items-center md:rounded-md p-5 shadow-md">
        <!-- Left Column -->
        <div class="md:p-6 md:w-1/2">
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-red-600">Privacy Policy</h2>
          <p class="font-semibold text-lg mb-4">Your Privacy is Our Priority</p>
          <p class="text-gray-700">
            At Nxt Kart, we are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
        </div>
        <!-- Right Column -->
        <div class="md:w-1/2 p-4 md:p-6 flex justify-center md:justify-end mt-4 md:mt-0">
          <NuxtImg src="/images/privacy-policy.svg" alt="Privacy Policy Image" class="w-[250px] h-auto"></NuxtImg>
        </div>
      </div>

      <!-- Dynamic Privacy Policy Sections -->
      <div v-for="(section, index) in privacyPolicySections" :key="index" class="bg-white p-4 md:p-6 md:rounded-md shadow-md w-full mx-auto mt-4">
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

const privacyPolicySections = ref([
  {
    title: 'Information We Collect',
    description: 'We collect various types of information to provide and improve our services.',
    subSections: [
      {
        title: 'Personal Information',
        content: 'We collect personal information such as your name, email address, mobile number, and address when you create an account or place an order.'
      },
      {
        title: 'Payment Information',
        content: 'Payment details are securely processed by our third-party payment gateway partners. We do not store your payment information on our servers.'
      },
      {
        title: 'Automatically Collected Information',
        content: 'We automatically collect information such as your IP address, device information, and usage data when you visit our website.'
      }
    ]
  },
  {
    title: 'How We Use Your Information',
    description: 'Your information is used to provide services, improve your experience, and for marketing and advertising purposes.',
    subSections: [
      {
        title: 'Providing Services',
        content: 'We use your information to process orders, provide customer support, and personalize your experience.'
      },
      {
        title: 'Marketing and Advertising',
        content: 'We may use your information to send you promotional materials and newsletters. You can opt out at any time.'
      },
      {
        title: 'Analytics and Improvements',
        content: 'We analyze usage data to improve our services and enhance security.'
      }
    ]
  },
  {
    title: 'How We Share Your Information',
    description: 'We may share your information with third-party service providers and as required by law.',
    subSections: [
      {
        title: 'Third-Party Service Providers',
        content: 'We share your information with service providers who perform services on our behalf, such as payment processing and order fulfillment.'
      },
      {
        title: 'Legal Requirements',
        content: 'We may disclose your information if required by law or in response to legal requests.'
      }
    ]
  },
  {
    title: 'Your Rights',
    description: 'You have the right to access, correct, and delete your personal information, and to opt out of marketing communications.',
    list: [
      'Access and review your personal information.',
      'Correct or update your personal information.',
      'Request deletion of your personal information.',
      'Opt out of marketing communications.'
    ]
  },
  {
    title: 'Data Security',
    description: 'We implement industry-standard security measures to protect your personal information.',
    subSections: []
  },
  {
    title: 'Data Retention',
    description: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy.',
    subSections: []
  },
  {
    title: 'Changes to This Privacy Policy',
    description: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.',
    subSections: []
  },
  {
    title: 'Contact Us',
    description: 'If you have any questions or concerns about this Privacy Policy, please contact us at: care@nxtkart.com',
  }
]);
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
