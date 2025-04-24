<template>
  <div class="bg-gray-100 md:py-6">
    <div class="mx-auto w-full md:w-4/5 py-5 space-y-5">
      <!-- First Section -->
      <div class="bg-white flex flex-col md:flex-row items-center md:rounded-md p-5 shadow-md">
        <!-- Left Column -->
        <div class="md:p-6 md:w-1/2">
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-red-600">About Us</h2>
          <p class="font-semibold text-lg mb-4">Your Trusted E-commerce Platform for Innovative Technology and
            Industrial Products</p>
          <p class="text-gray-700">
            Nxt Kart is a leading e-commerce company that caters to both B2B and B2C operations, specializing in
            cutting-edge technology and industrial products.
          </p>
        </div>
        <!-- Right Column -->
        <div class="md:w-1/2 p-4 md:p-6 flex justify-center md:justify-end mt-4 md:mt-0">
          <NuxtImg src="/images/NxtKart_Logo.svg" alt="Support Image" class="w-[250px] h-auto"></NuxtImg>
        </div>
      </div>

      <div class="flex md:justify-center">
        <div class="w-full bg-white md:p-4 md:rounded-md mt-4 p-3">
          <p class="font-semibold">We offer a diverse range of categories including:</p>

          <ul class="list-disc my-4 pl-5 space-y-2">
            <li>
              <strong>
                <NuxtLink to="/category/drone-parts">Drone Parts</NuxtLink>:
              </strong> From frames and propellers to flight
              controllers and cameras, we have everything you need to build, repair, or upgrade your drone.
            </li>
            <li>
              <strong>
                <NuxtLink to="/category/motors-drivers-pumps-actuators">Motors, Drivers, Pumps, Actuators</NuxtLink>:
              </strong>
              High-performance motors, drivers, pumps, and actuators for various industrial and DIY applications.
            </li>
            <li>
              <strong>
                <NuxtLink to="/category/mechanical-parts,-measurement-&-workbench-tools">Mechanical Parts, Measurement &
                  Workbench Tools
                </NuxtLink>:
              </strong>
              Precision tools and measurement instruments for professional and hobbyist use.
            </li>
            <li>
              <strong>
                <NuxtLink to="/category/electronic-modules-and-displays">Electronic Modules and Displays</NuxtLink>:
              </strong> A wide
              range of modules and displays for your electronic projects, including LED, LCD, and OLED displays.
            </li>
            <li>
              <strong>
                <NuxtLink to="/category/electronic-components">Electronic Components</NuxtLink>:
              </strong> Essential components such
              as resistors, capacitors, ICs, and more for all your electronic needs.
            </li>
            <li>
              <strong>
                <NuxtLink to="/category/diy-&-maker-kits">DIY & Maker Kits</NuxtLink>:
              </strong> Kits designed for enthusiasts and
              educators to explore electronics, robotics, and programming.
            </li>
            <li>
              <strong>
                <NuxtLink to="/category/sensors-modules">Sensors Modules</NuxtLink>:
              </strong> High-quality sensor modules for various
              applications, including temperature, pressure, and motion sensing.
            </li>
            <li>
              <strong>
                <NuxtLink to="/category/development-boards">Development Boards</NuxtLink>:
              </strong> Popular development boards like
              Arduino, Raspberry Pi, and ESP32 for prototyping and development.
            </li>
            <li>
              <strong>
                <NuxtLink to="/category/3d-printers-and-parts">3D Printers and Parts</NuxtLink>:
              </strong> 3D printers, filaments, and
              accessories for all your 3D printing needs.
            </li>
            <li>
              <strong>
                <NuxtLink to="/category/battery-chargers-and-accessories">Batteries, Chargers and Accessories</NuxtLink>
                :
              </strong>
              Reliable power solutions for your electronic devices and projects.
            </li>
            <li>
              <strong>
                <NuxtLink to="/category/iot-and-wireless">IoT and Wireless</NuxtLink>:
              </strong> IoT devices and wireless modules for
              connected projects and smart home applications.
            </li>
            <li>
              <strong>
                <NuxtLink to="/category/electric-vehicle-parts">Electric Vehicle Parts</NuxtLink>:
              </strong> Components and
              accessories for electric vehicles, including motors, controllers, and batteries.
            </li>
          </ul>

          <p>With over 45,000+ SKUs across 800+ categories, Nxt Kart is your go-to platform for high-quality, innovative
            products.</p>

          <p>We provide digital procurement and supply chain solutions for various industries, ensuring a seamless and
            efficient shopping experience. Our mission is to offer exclusive deals, effortless delivery, competitive
            prices, and exceptional customer satisfaction.</p>

          <h2 class="text-lg font-bold mt-4 mb-2">Exclusive Offers and Coupons</h2>
          <ul class="list-disc mb-4 pl-5 space-y-2">
            <li><strong>GST Invoice:</strong> Users registered under GST will receive an invoice for their purchases.
            </li>
            <li><strong>No-Cost EMI:</strong> Pay for your products in easy installments with no interest charged.</li>
            <li><strong>Coupons and Offers:</strong> Various coupon codes and offers are available on our products,
              varying
              by item and
              cart value.</li>
            <li><strong>Request for Quote (RFQ):</strong> For out-of-stock products, buyers can request a quote, and
              we'll
              get back to
              you within 24 hours with the best price.</li>
            <li><strong>Payment Options:</strong> We offer a range of payment methods, including cash on delivery, UPI,
              wallet
              payments, debit/credit cards, net banking, and more.</li>
            <li><strong>Online Payment Discounts:</strong> Instant discounts for online payments via UPI, debit/credit
              cards, EMI, net
              banking, and wallets.</li>
            <li><strong>Low Prices:</strong> Our prices are competitive, focusing on providing high-worth products at
              affordable costs.</li>
          </ul>

          <h2 class="text-lg font-bold mt-4 mb-2">Why Shop Industrial Products Online from Nxt Kart?</h2>
          <p>
            Nxt Kart is committed to serving a wide array of customers, including students, researchers, home users,
            industries, educators, startups, and government institutions. Our platform is designed to meet the unique
            needs
            of each group:
          </p>
          <ul class="list-disc pl-5 py-4">
            <li>
              <strong>Students:</strong> Whether you're working on a school project, a science fair exhibit, or a
              university
              thesis, Nxt Kart offers a wide range of affordable and high-quality components. From electronic modules to
              DIY
              kits, we provide the tools you need to bring your ideas to life.
            </li>
            <li>
              <strong>Researchers:</strong> For academics and professionals engaged in cutting-edge research, Nxt Kart
              supplies precision instruments, sensors, and development boards. Our extensive inventory ensures you have
              access to the latest technology to support your experiments and innovations.
            </li>
            <li>
              <strong>Home Users:</strong> DIY enthusiasts and hobbyists can explore our selection of tools, 3D
              printers,
              and smart home devices. Whether you're upgrading your home or pursuing a personal project, Nxt Kart has the
              products and support to help you succeed.
            </li>
            <li>
              <strong>Industries:</strong> We cater to businesses of all sizes, from SMEs to large enterprises,
              providing
              industrial-grade components and solutions. Our offerings include motors, pumps, actuators, and electric
              vehicle parts, all backed by reliable supply chain solutions to keep your operations running smoothly.
            </li>
            <li>
              <strong>Educators:</strong> Teachers and educational institutions can utilize our products for STEM
              education,
              robotics clubs, and hands-on learning activities. We offer educational kits and resources designed to
              inspire
              and engage students in science and technology.
            </li>
            <li>
              <strong>Startups:</strong> For emerging startups, Nxt Kart provides access to cost-effective and
              high-quality
              components needed for prototyping and product development. Our platform supports innovation by offering a
              wide
              range of electronic and mechanical parts.
            </li>
            <li>
              <strong>Government Institutions:</strong> We supply government agencies and public sector organizations
              with
              reliable and secure technology solutions. Our products are suitable for infrastructure projects, public
              services, and research initiatives.
            </li>
          </ul>
          <p>
            With over 3,000 SMEs and educational institutions across India relying on us for their technology and
            industrial
            supplies, Nxt Kart offers nationwide delivery to more than 25,000+ PIN codes. We partner with secure payment
            providers and offer 24/7 customer service support through chatbots and a dedicated customer care team. Our
            goal
            is to ensure a seamless and efficient shopping experience for all our customers, regardless of their needs
            or
            scale.
          </p>


          <h2 class="text-lg font-bold mt-4 mb-2">Take Advantage of Exclusive Features at nxtkart.com</h2>
          <p>Nxt Kart offers a seamless online shopping experience with features like order tracking, bulk-order inquiry
            options, product cancellation, a smart return policy, and a smooth replacement process. Shop with us today
            and
            experience the difference!</p>
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
