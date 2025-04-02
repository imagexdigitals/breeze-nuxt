<script setup lang="ts">
const appConfig = useAppConfig()

useHead({
  titleTemplate(title) {
    return title ? `${title} | ${appConfig.siteTitle}` : appConfig.siteTitle
  },
})
</script>

<template>
  <NuxtLoadingIndicator />

  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <UNotifications />
</template>

<style>
/* If you write something like this: */
:root {
  font-family: Figtree;
}
</style>
