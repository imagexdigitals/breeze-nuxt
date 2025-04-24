<template>
  <div class="bg-gray-100 md:py-6">
    <div class="mx-auto w-full md:w-4/5 py-5 space-y-5">
      <!-- First Section -->
      <div class="bg-white flex flex-col md:flex-row items-center md:rounded-md p-5 shadow-md">
        <!-- Left Column -->
        <div class="md:p-6 md:w-1/2">
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-red-600">Contact Us</h2>
          <p class="font-semibold text-lg mb-4">Reach out to our support team anytime</p>
          <p class="text-gray-700">
            Support team ready to help. We are a highly agile and nimble-footed organization which believes in a
            collaborative approach to solve problems of the world. And that is why the culture of customer feedback and
            satisfaction ranks high on our agenda. We are happy to help you round the clock to the best of our ability.
          </p>
        </div>
        <!-- Right Column -->
        <div class="md:w-1/2 p-4 md:p-6 flex justify-center md:justify-end mt-4 md:mt-0">
          <NuxtImg src="/images/contact-us-vector.svg" alt="Support Image" class="max-w-full h-auto"></NuxtImg>
        </div>
      </div>

      <!-- Second Section -->
      <div class="px-4 md:px-20 flex flex-col md:flex-row gap-5 rounded-md py-8">
        <!-- Left Column -->
        <div class="bg-white p-4 md:p-6 w-full md:w-1/2 rounded-md shadow-md">
          <h3 class="text-xl font-semibold mb-2 text-center md:text-left">Address</h3>
          <p class="text-gray-700 text-center md:text-left">
            No. 59, Krishna Street, Gandhi Nagar,<br>
            Perumathunallur, Guduvanchery<br>
            Chennai, Tamil Nadu, 603202
          </p>
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
                <span class="font-medium text-nxtkartsecondaryBlue">care@nxtkart.com</span>
              </a>
            </div>
            <!-- WhatsApp Icon -->
            <div class="flex justify-center md:justify-start items-center space-x-2">
              <a href="https://wa.me/919487929592" aria-label="WhatsApp" target="_blank"
                class="flex items-center space-x-2">
                <Icon name="logos:whatsapp-icon" class="w-6 h-6 text-gray-700" />
                <span class="font-medium">+91 9487929592 (10am to 6pm)</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div
          class="bg-white w-full md:w-1/2 flex flex-col md:flex-row gap-5 rounded-md shadow-md items-center md:p-4 mt-4 md:mt-0">
          <!-- Left Sub-Column -->
          <div class="w-full md:w-1/2 px-4 md:px-8 pt-6 md:pt-0">
            <h3 class="text-xl font-bold mb-2 text-red-600 text-center md:text-left">Need Any Assistance?</h3>
            <p class="text-gray-700 text-center md:text-left">Nxt Kart is here to help you</p>
            <div class="text-center md:text-left">
              <a href="https://wa.me/919487929592?text=Hi%2C%20I%20want%20help" target="_blank"
                class="mt-4 inline-block bg-red-600 text-white px-3 py-1.5 rounded text-sm">Chat Now</a>
            </div>
          </div>

          <!-- Right Sub-Column -->
          <div class="w-full md:w-1/2 flex items-center justify-center mt-4 md:mt-0">
            <NuxtImg src="/images/chat-with-us.svg" alt="Assistance Image" class="w-[250px] h-auto"></NuxtImg>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>

useHead({
  title: 'Contact Us - Reach out to our support team anytime',
  meta: [
    {
      name: 'description',
      content: 'Contact Nxt Kart for support and assistance. Our team is ready to help you round the clock.'
    }
  ]
})
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
