<template>
  <div class="bg-gray-100 md:py-6">
    <div class="mx-auto w-full md:w-4/5 py-5 space-y-5">
      <!-- First Section -->
      <div class="bg-white flex flex-col md:flex-row items-center md:rounded-md p-5 shadow-md">
        <!-- Left Column -->
        <div class="md:p-6 md:w-1/2">
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-red-600">Careers</h2>
          <p class="font-semibold text-lg mb-4">Join Our Team and Shape the Future of E-commerce</p>
          <p class="text-gray-700">
            At Nxt Kart, we are always on the lookout for talented individuals who share our passion for innovation and
            excellence. Explore our current job openings and become a part of our dynamic team.
          </p>
          <!-- Scam Alert Message -->
          <div class="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded text-sm">
            <strong>Scam Alert:</strong> Be cautious of fraudulent job offers. Nxt Kart will never ask for payment or
            personal
            information until a formal offer is made. If you suspect a scam, please report it to
            <a href="mailto:report@nxtkart.com" class="text-red-600">care@nxtkart.com</a>.
          </div>
        </div>
        <!-- Right Column -->
        <div class="md:w-1/2 p-4 md:p-6 flex justify-center md:justify-end mt-4 md:mt-0">
          <img src="/images/career-image.png" alt="Careers Image" class="w-[250px] h-auto">
        </div>
      </div>

      <!-- Filter Section -->
      <div class="flex flex-col md:flex-row md:justify-between gap-4">
        <div class="bg-white p-4 md:p-6 md:rounded-md shadow-md w-full">
          <h3 class="text-xl font-semibold mb-3">Filter Job Openings</h3>
          <div class="flex flex-col md:flex-row gap-4">
            <!-- Location Filter -->
            <div>
              <h4 class="font-semibold">Location</h4>
              <div v-for="location in locations" :key="location" class="flex items-center space-y-2">
                <input type="checkbox" v-model="selectedLocations" :value="location" class="mr-2">
                <label>{{ location }}</label>
              </div>
            </div>
            <!-- Work Type Filter -->
            <div>
              <h4 class="font-semibold">Work Type</h4>
              <div v-for="type in workTypes" :key="type" class="flex items-center space-y-2">
                <input type="checkbox" v-model="selectedWorkTypes" :value="type" class="mr-2">
                <label>{{ type }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Job Postings Section -->
      <div class="flex flex-col md:flex-row md:justify-center gap-4">
        <div class="w-full bg-white p-4 md:p-6 md:rounded-md shadow-md">
          <h3 class="text-xl font-semibold mb-3">Current Job Openings ({{ filteredJobs.length }})</h3>
          <div class="space-y-4">
            <div v-for="job in filteredJobs" :key="job.title" class="p-4 border border-gray-200 rounded-md">
              <h4 class="text-lg font-semibold">{{ job.title }}</h4>
              <p class="text-gray-700">{{ job.description }}</p>
              <div class="flex items-center space-x-4 mt-2">
                <div class="flex items-center space-x-1">
                  <Icon name="mingcute:location-line" class="w-5 h-5 text-gray-700" />
                  <span>{{ job.location }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Icon name="vaadin:office" class="w-5 h-5 text-gray-700" />
                  <span>{{ job.type }}</span>
                </div>
              </div>
              <button @click="openModal" class="text-red-600 mt-2 inline-block">Apply Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div class="bg-white p-6 rounded-md shadow-md max-w-md w-full">
        <h3 class="text-xl font-semibold mb-4">Apply Now</h3>
        <p class="text-gray-700 mb-4">
          Our online recruitment platform is currently under maintenance. Kindly send your latest updated resume to
          <a href="mailto:care@nxtkart.com" class="text-red-600">care@nxtkart.com</a>. We will get back to you soon.
        </p>
        <button @click="closeModal" class="bg-red-600 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>


const isModalOpen = ref(false);

const jobs = ref([
  {
    title: 'Backend Developer (PHP)',
    description: 'Develop and maintain our e-commerce backend using PHP. You will work on enhancing our platform’s scalability and performance. Experience with Laravel is required, and knowledge of RESTful APIs and database optimization is a plus.',
    location: 'Chennai',
    type: 'Full Time (Hybrid)'
  },
  {
    title: 'Backend Developer (Python)',
    description: 'Work on our backend services using Python and FastAPI. You will be responsible for designing and implementing microservices, ensuring high availability and reliability. Experience with cloud services and containerization is highly valued.',
    location: 'Chennai',
    type: 'Full Time (Hybrid)'
  },
  {
    title: 'Backend Developer (ASP.NET)',
    description: 'Develop and maintain backend services using ASP.NET. Your role involves creating robust and secure APIs, integrating with various third-party services, and optimizing database interactions. Proficiency in C# and SQL is essential.',
    location: 'Chennai',
    type: 'Full Time (Hybrid)'
  },
  {
    title: 'Frontend Developer (Vue.js)',
    description: 'Build and maintain our e-commerce frontend using Vue.js. You will focus on creating responsive and user-friendly interfaces, ensuring cross-browser compatibility, and optimizing performance. Experience with Vuex for state management is beneficial.',
    location: 'Chennai',
    type: 'Full Time (Remote)'
  },
  {
    title: 'Frontend Developer (Nuxt.js)',
    description: 'Develop and optimize our frontend using Nuxt.js. Your tasks include implementing server-side rendering, improving SEO, and enhancing user experience through dynamic routing and component optimization. Familiarity with static site generation is a plus.',
    location: 'Chennai',
    type: 'Full Time (Remote)'
  },
  {
    title: 'Product Analyst',
    description: 'Analyze product performance and user behavior to drive data-driven decisions. You will work closely with cross-functional teams to identify trends, conduct A/B testing, and provide actionable insights. Proficiency in analytics tools like Google Analytics and Tableau is required.',
    location: 'Chennai',
    type: 'Full Time (Remote)'
  },
  {
    title: 'DevOps Engineer',
    description: 'Manage and optimize our deployment processes. Your responsibilities include setting up CI/CD pipelines, monitoring infrastructure, and ensuring high availability of our services. Experience with cloud platforms like AWS or Azure and container orchestration tools like Kubernetes is essential.',
    location: 'Chennai',
    type: 'Full Time (Remote)'
  },
  {
    title: 'QA Engineer',
    description: 'Ensure the quality of our e-commerce platform. You will develop and execute test plans, identify and report bugs, and collaborate with developers to resolve issues. Experience with automated testing tools like Selenium or Cypress is required.',
    location: 'Chennai',
    type: 'Full Time (Remote)'
  },
  {
    title: 'UI/UX Designer',
    description: 'Design intuitive and user-friendly interfaces for our e-commerce platform. You will create wireframes, prototypes, and conduct user research to enhance the overall user experience. Proficiency in design tools like Figma or Sketch is required.',
    location: 'Chennai',
    type: 'Full Time (Remote)'
  },
  {
    title: 'Data Scientist',
    description: 'Develop and implement machine learning models to enhance our e-commerce platform. You will analyze large datasets, build predictive models, and collaborate with engineers to integrate these models into our systems. Experience with Python and data analysis libraries like pandas and scikit-learn is required.',
    location: 'Chennai',
    type: 'Full Time (Remote)'
  },
  {
    title: 'Product Manager',
    description: 'Manage the product lifecycle from concept to launch. You will work with cross-functional teams to define product strategy, develop roadmaps, and ensure successful product delivery. Experience in product management and agile methodologies is required.',
    location: 'Anywhere',
    type: 'Intern'
  },
  {
    title: 'Product Manager',
    description: 'Assist in managing the product lifecycle and support the product team in various tasks. You will gain hands-on experience in product management, market research, and stakeholder communication. This role is ideal for students or recent graduates looking to start their career in product management.',
    location: 'Anywhere',
    type: 'Intern'
  },
  {
    title: 'Social Media Manager',
    description: 'Manage and grow our social media presence. You will create engaging content, develop social media strategies, and analyze performance metrics. Experience with social media platforms and content creation tools is required.',
    location: 'Anywhere',
    type: 'Part Time'
  }
]);

const selectedLocations = ref([]);
const selectedWorkTypes = ref([]);

const locations = computed(() => {
  const uniqueLocations = new Set(jobs.value.map(job => job.location));
  return Array.from(uniqueLocations);
});

const workTypes = computed(() => {
  const uniqueWorkTypes = new Set(jobs.value.map(job => job.type));
  return Array.from(uniqueWorkTypes);
});

const filteredJobs = computed(() => {
  return jobs.value.filter(job => {
    const locationMatch = selectedLocations.value.length === 0 || selectedLocations.value.includes(job.location);
    const typeMatch = selectedWorkTypes.value.length === 0 || selectedWorkTypes.value.includes(job.type);
    return locationMatch && typeMatch;
  });
});

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Function to generate job posting schema
const generateJobPostingSchema = (job) => {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressRegion: "TN", // Assuming Tamil Nadu for Chennai
        addressCountry: "IN"
      }
    },
    employmentType: job.type.split(' ')[0], // Extracting the employment type
    hiringOrganization: {
      "@type": "Organization",
      name: "Nxt Kart"
    },
    datePosted: new Date().toISOString()
  };
};

// Watch for changes in filteredJobs and update the head
watch(filteredJobs, (newJobs) => {
  useHead({
    script: newJobs.map(job => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(generateJobPostingSchema(job))
    }))
  });
}, { immediate: true });
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
