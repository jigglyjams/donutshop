// ==================================================================================
// =========================== API Response Types ===================================
// ==================================================================================
export interface PrintfulPaging {
  total: number;
  offset: number;
  limit: number;
}

export interface PrintfulResponse<T> {
  code: number;
  result: T | null;
  paging?: PrintfulPaging;
  error?: string;
}

export interface SyncProductInfo {
  sync_product: SyncProduct;
  sync_variants: SyncVariant[];
}


// ==================================================================================
// =========================== API Objects ==========================================
// ==================================================================================
export type AddressInfo = {
  email?: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  state_code: string;
  state_name: string;
  country_code: string;
  country_name: string;
  zip: string;
};

export type ShippingInfo = {
  id: string;
  name: string;
  rate: string;
  currency: string;
  minDeliveryDays: number;
  maxDeliveryDays: number;
  minDeliveryDate: string;
  maxDeliveryDate: string;
}

export type ItemInfo = {
  variant_id: number;
  quantity: number;
  warehouse_product_variant_id?: number;
  external_variant_id?: string;
  value?: string;
};

export interface SyncProduct {
  id: number;
  external_id: string;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string;
  is_ignored: boolean;
}

export interface SyncVariant {
  id: number;
  external_id: string;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  is_ignored: boolean;
  sku: string;
  product: VariantProduct;
  files: VariantFile[];
  options: VariantOption[];
  main_category_id: number;
  warehouse_product_id: number | null;
  warehouse_product_variant_id: number | null;
  size: string;
  color: string;
  availability_status: string;
}

export interface VariantProduct {
  variant_id: number;
  product_id: number;
  image: string;
  name: string;
}

export interface VariantFile {
  type: string;
  id: number;
  url: string | null;
  options?: FileOption[];
  hash: string;
  filename: string;
  mime_type: string;
  size: number;
  width: number;
  height: number;
  dpi: number | null;
  status: string;
  created: number;
  thumbnail_url: string;
  preview_url: string;
  visible: boolean;
  is_temporary: boolean;
  stitch_count_tier: string | null;
  message: string;
}

export interface FileOption {
  id: string;
  value: object | string;
}

export interface VariantOption {
  id: string;
  value: object | string;
}

export type CostBreakdown = {
  currency: string;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  vat: number;
  total: number;
  digitization: number;
  additional_fee: number;
  fulfillment_fee: number;
};

