<template>
  <section class="rounded-sm overflow-y-auto w-full pt-4">
    <h2 class="text-xl font-semibold">Related Products</h2>
    <div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 mt-4">
      <ProductArchive
        v-for="product in relatedProducts"
        :key="product.id"
        :id="product.id"
        :image="product.image"
        :name="product.name"
        :salePrice="product.sale_price"
        :mrpPrice="product.mrp_price"
        :discountPercentage="product.discount_percentage"
        :brand="product.brand"
        :slug="product.slug"
        :status="product.status"
        :brandSlug="product.brand_slug"
        :minimum_qty="product.minimum_qty"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
interface RelatedProduct {
  id: number;
  name: string;
  image: string;
  sale_price: string;
  mrp_price: string;
  discount_percentage: string;
  brand: string | null;
  slug: string;
  status: number;
  brand_slug: string | null;
  minimum_qty: number;
}

interface Props {
  relatedProducts: RelatedProduct[];
}

const props = defineProps<Props>();
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
