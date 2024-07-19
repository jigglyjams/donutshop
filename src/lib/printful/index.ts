import {
  AddressInfo,
  CostBreakdown,
  ItemInfo,
  PrintfulResponse,
  ShippingInfo,
  SyncProduct,
  SyncProductInfo
} from "./types";

const API = "https://api.printful.com";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface PrintfulRequestOptions {
  endpoint: string;
  method?: HttpMethod;
  body?: any;
  query?: Record<string, string>;
}

export async function printful<T>({ endpoint, method = 'GET', body, query }: PrintfulRequestOptions): Promise<PrintfulResponse<T>> {
  let url = `${API}${endpoint}`;
  
  if (query) {
    const queryString = new URLSearchParams(query).toString();
    url += `${url.includes('?') ? '&' : '?'}${queryString}`;
  }
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.PRINTFUL_KEY}`,
  };

  const options: RequestInit = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(url, options);
    const data: PrintfulResponse<T> = await response.json();

    if (!response.ok) {
      return {
        code: response.status,
        result: null,
        error: data.error || response.statusText
      };
    }

    return data;
  } catch (error: unknown) {
    return {
      code: 500,
      result: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function getShippingRates(recipient: AddressInfo, items: ItemInfo[]) {
  return printful<ShippingInfo[]>({
    endpoint: '/shipping/rates',
    method: 'POST',
    body: { recipient, items },
  });
}

export async function getProducts() {
  return printful<SyncProduct[]>({
    endpoint: '/store/products',
  });
}

export async function getProduct(id: string) {
  return printful<SyncProductInfo>({
    endpoint: `/store/products/${id}`,
  });
}

export async function getOrder(id: number) {
  return printful<any>({
    endpoint: `/v2/orders/${id}/order-items`,
  });
}

export async function getOrderCost(recipient: AddressInfo, items: any[]) {
  return printful<CostBreakdown>({
    endpoint: "/orders/estimate-costs",
    method: "POST",
    body: { recipient, items },
  });
}

export async function createOrder(recipient: AddressInfo, items: any[]) {
  return printful<any>({
    endpoint: '/orders',
    method: 'POST',
    body: { recipient, items },
  });
}

// export async function getOrders(limit: number = 100, offset: number = 0) {
//   return printful<any>({
//     endpoint: '/orders',
//     query: { limit: limit.toString(), offset: offset.toString() },
//   });
// }


