<script setup lang="ts">
import type { NuxtError } from '#app'

interface ErrorPageProps {
  error: NuxtError
}

const props = defineProps<ErrorPageProps>()
const appConfig = useAppConfig()

useHead({
  title: `Error | ${appConfig.siteTitle}`,
})

definePageMeta({
  layout: 'default',
});
</script>

<template>
  <HeaderDesktop class="header-desktop" />
  <HeaderMobile class="header-mobile" />
  <div class="flex flex-col justify-center items-center pb-10 gap-5 h-screen my-10 md:my-0">
    <section class="page_404">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 ">
            <div class="col-sm-10 col-sm-offset-1  text-center">
              <div class="four_zero_four_bg">
                <h1 class="text-center ">404</h1>
              </div>

              <div class="contant_box_404">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="min-w-96 max-w-xl text-center -mt-24">
      <h1 class="text-lg font-semibold">
        Oops! An error occurred.
      </h1>
      <p>
        <strong>Error details:</strong>
      </p>
      <p>
        {{ props.error.message }}
      </p>
      <div class="flex justify-center mt-4">
        <NuxtLink to="/" class="bg-nxtkartsecondaryBlue text-white px-4 py-2 rounded">
          Go to homepage
        </NuxtLink>
      </div>
    </div>
  </div>
  <FooterDesktop />
</template>

<style scoped>
.header-desktop {
  display: none;
}

.header-mobile {
  display: block;
}

@media (min-width: 768px) {
  .header-desktop {
    display: block;
  }

  .header-mobile {
    display: none;
  }

  .four_zero_four_bg {
    width: 700px; /* Width for desktop */
  }
}

@media (max-width: 767px) {
  .four_zero_four_bg {
    width: 370px; /* Width for mobile */
  }
}

.page_404 {
  padding: 40px 0;
  background: #fff;
  font-family: 'Arvo', serif;
}

.page_404 img {
  width: 100%;
}

.four_zero_four_bg {
  background-image: url(/images/404.gif);
  height: 500px;
  background-position: center;
}

.four_zero_four_bg h1 {
  font-size: 80px;
}

.four_zero_four_bg h3 {
  font-size: 80px;
}

.link_404 {
  color: #fff !important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
}

.contant_box_404 {
  margin-top: -50px;
}
</style>

