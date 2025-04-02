// types/types.d.ts
export interface Product {
    id: number;
    name: string | null;
    slug: string;
    sku: string | null;
    type: string | null;
    status: number;
    index_status: string | null;
    category: string;
    brand: string;
    brand_slug: string;
    condition: number | null;
    minimum_qty: number;
    sale_price: string;
    save_price: string;
    mrp_price: string;
    tax: string | null;
    weight: string;
    weight_unit_code: string;
    width: string;
    width_unit_code: string;
    depth: string;
    depth_unit_code: string;
    shipping_dimensions: string | null;
    country_of_origin: string;
    attachments: Array<{ label: string; url: string }>;
    warranty: string;
    image: string;
    gallery: string[];
    breadcrumb: Array<{ name: string; url: string }>;
    specifications: Array<{ label: string; value: string }>;
    description: string;
    related_products: Array<{
      id: number;
      name: name;
      image: string;
      sale_price: string;
      mrp_price: string;
      discount_percentage: string;
      brand: string | null;
      slug: string;
      status: number;
      brand_slug: string | null;
      minimum_qty: number;
    }>;
  }
  
  