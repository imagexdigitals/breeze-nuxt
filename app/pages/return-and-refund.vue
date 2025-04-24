<template>
  <div class="bg-gray-100 md:py-6">
    <div class="mx-auto w-full md:w-4/5 py-5 space-y-5">
      <!-- Introduction Section -->
      <div class="bg-white flex flex-col md:flex-row items-center md:rounded-md p-5 shadow-md">
        <!-- Left Column -->
        <div class="md:p-6 md:w-1/2">
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-red-600">Return and Refund Policy</h2>
          <p class="font-semibold text-lg mb-4">Hassle-Free Returns and Refunds</p>
          <p class="text-gray-700">
            At Nxt Kart, we are dedicated to providing the best shopping experience for our customers. Our return and
            refund policy is designed to meet your needs and ensure your satisfaction.
          </p>
        </div>
        <!-- Right Column -->
        <div class="md:w-1/2 p-4 md:p-6 flex justify-center md:justify-end mt-4 md:mt-0">
          <NuxtImg src="/images/return-and-refund.svg" alt="Return and Refund Image" class="w-[250px] h-auto"></NuxtImg>
        </div>
      </div>

      <!-- Dynamic Sections -->
      <div v-for="(section, index) in sections" :key="index" class="bg-white p-4 md:p-6 md:rounded-md shadow-md w-full mx-auto mt-4">
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

const sections = ref([
  {
    title: 'Satisfaction Guarantee',
    description: 'Your satisfaction is our top priority. We offer a 14-day period from the date of delivery to exchange or return items that do not meet your expectations. This guarantee is applicable to all purchases made on NxtKart.com or in our physical stores.',
    subSections: [
      {
        title: 'The Nxt Kart Guarantee',
        content: 'If you find that the item purchased does not meet your expectations within 14 days, you may request an exchange for another item sold by Nxt Kart. The item must comply with the conditions outlined below and be in its original condition.'
      },
      {
        title: 'Starting the Exchange Process',
        content: 'To initiate an exchange, visit any Nxt Kart store with the item and your invoice, or open an RMA request on our website. You will need to send the item to our central warehouse, and the cost of return shipping will be your responsibility.'
      },
      {
        title: 'Refund and Exchange for New Items',
        content: 'If the item is suitable for exchange and within the 14-day period, we will issue a credit note for the price of the exchanged product. This credit can be used for new purchases at Nxt Kart and is valid for one year.'
      },
      {
        title: 'Other Rights',
        content: 'The Satisfaction Guarantee is provided under the terms outlined above. Any additional rights related to returns are applicable only to consumers and are subject to case-by-case assessment by Nxt Kart.'
      }
    ]
  },
  {
    title: 'Returning Purchases on NxtKart.com',
    description: '',
    subSections: [
      {
        title: 'What is the return period?',
        content: 'Returns are subject to availability and are not applicable to all items. Please check the eligibility of your item before initiating a return.'
      },
      {
        title: 'How is the refund made?',
        content: 'Refunds are made using the same payment method used for the purchase. The refund will be processed after validation of compliance with the return conditions.'
      },
      {
        title: 'Can any item be returned?',
        content: 'Returns are subject to availability and not all items are eligible. Please ensure your item meets the return conditions outlined below.'
      },
      {
        title: 'How do I return an item purchased from NxtKart.com?',
        content: 'To return an item, visit any Nxt Kart store with the item and your invoice, or open an RMA request on our website and send the item to our facilities. We reserve the right to reject the return if the item does not meet the return conditions.'
      }
    ]
  },
  {
    title: 'Conditions of the Item to be Exchanged or Returned',
    description: 'For an item to be eligible for exchange or return, it must meet the following conditions:',
    list: [
      'The item must be in its original condition, intact, and without any signs of wear or damage.',
      'All accessories, manuals, and packaging must be included and in perfect condition.',
      'The original invoice must be included with the returned item.'
    ]
  },
  {
    title: 'Items Not Subject to Exchange or Return',
    description: 'Certain items are not eligible for exchange or return, including:',
    list: [
      'Refurbished products.',
      'Products with expired warranties.',
      'Items damaged due to customer misuse.',
      'Specific items listed as non-returnable due to hygiene, safety, or manufacturer\'s recommendations.'
    ]
  },
  {
    title: 'Nxt Kart Advice and Tips',
    description: 'To ensure a smooth return or exchange process, please follow these tips:',
    list: [
      'Always keep your order confirmation and invoice for reference.',
      'Contact customer support as soon as possible if you encounter any issues.',
      'Ensure that the product is packed securely to avoid damage during transit.',
      'Before making a purchase, ensure the product meets your requirements by researching and asking questions.'
    ]
  },
  {
    title: 'Additional Policy Information',
    description: '',
    subSections: [
      {
        title: 'Cancellation Policy',
        content: 'Cancellation is not allowed once the order is shipped or handed over to the delivery partner. This policy ensures that our logistics processes remain efficient and that we can fulfill orders promptly. If you need to cancel an order, please do so before it is shipped. Once the order is in transit, we cannot guarantee a cancellation.'
      },
      {
        title: 'Return Policy',
        content: 'Returns are allowed only for items that are not working, damaged during transport, incorrect products, or if there are discrepancies in the order. To initiate a return, please contact our customer support team within the specified timeframe. You will need to provide the original invoice and ensure the item is in its original condition. We reserve the right to inspect the returned item and reject the return if it does not meet our return conditions.'
      },
      {
        title: 'Refund Policy',
        content: 'Refunds are only allowed if the customer refuses a replacement or if the item cannot be replaced. The refund process will be initiated once the return package reaches our warehouse and passes quality and quantity checks. The refund will be processed to the original payment method within 5 to 7 business days, depending on the payment gateway and method. Please note that the refund time may vary based on your bank\'s processing time.'
      },
      {
        title: 'Warranty Information',
        content: 'Warranty terms vary depending on the product and are specified on the product page or in the accompanying documentation. Warranty coverage typically includes manufacturing defects and does not cover damage caused by misuse, accidents, or unauthorized modifications. Refurbished products are not eligible for warranty coverage. For warranty claims, please contact our customer support team with your proof of purchase.'
      },
      {
        title: 'Exchange Policy',
        content: 'Exchange is allowed for selected products only and is subject to availability. Not all items are eligible for exchange. To initiate an exchange, please visit any Nxt Kart store with the item and your invoice, or open an RMA request on our website. The item must be in its original condition and comply with our exchange conditions. We reserve the right to reject the exchange if the item does not meet these conditions.'
      }
    ]
  }
]);
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
