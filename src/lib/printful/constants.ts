export const variants: any[] = [
  {
    sync_variant_id: 4253206898,
    quantity: 1,
  },
  {
    sync_variant_id: 4253206899,
    quantity: 1,
  },
  {
    sync_variant_id: 4253206900,
    quantity: 1,
  },
]

export const betterStatus = {
  draft: "order placed",
  pending: "waiting for fulfillment",
  failed: "order failed",
  canceled: "order canceled",
  inprocess: "in production",
  onhold: "order on hold",
  partial: "order partially fulfilled",
  fulfilled: "shipped",
  archived: "order archived"
} as const;

export type BetterStatus = keyof typeof betterStatus;