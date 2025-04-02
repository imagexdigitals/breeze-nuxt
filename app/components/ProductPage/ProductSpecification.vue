<template>
  <div>
    <!-- Specification Content -->
    <table class="min-w-full bg-white border border-dashed border-zinc-300">
      <tbody>
        <tr v-for="(spec, index) in specifications" :key="spec.label" :class="{ 'bg-gray-200': index % 2 === 1 }">
          <td class="py-2 px-4 border border-dashed border-zinc-300">{{ spec.label }}</td>
          <td class="py-2 px-4 border border-dashed border-zinc-300">{{ spec.value }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="attachments && attachments.length" class="mt-4">
      <h3 class="font-semibold text-nxtkartsecondaryBlue uppercase">Available Downloads</h3>
      <ul class="list-disc list-inside mt-2">
        <div v-for="attachment in attachments" :key="attachment.url" class="mt-4">
          <a :href="attachment.url" target="_blank"
            class="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium text-sm px-5">{{
              attachment.label
            }}</a>
        </div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  specifications: Array<{ label: string; value: string }>;
  attachments: Array<{ label: string; url: string }>;
}

const props = defineProps<Props>();
</script>

<style scoped>
.bg-gray-200 {
  background-color: #F1F1F1;
}
</style>
