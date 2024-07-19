import { getOrder } from '@/lib/printful';

export default async function OrderPage({ params }: { params: { id: string } }) {
  const { id } = params;
  let order;
  try {
    order = await getOrder({ id });
    console.log("order", order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return <OrderNotFound />
  }

  if (!order.result) return <OrderNotFound />

  return (
    <div className="w-full max-w-4xl justify-center mx-auto pt-12 font-mono px-16 space-y-6">
      <h1 className="text-3xl font-bold">Your order has been received 🥳</h1>
      <p>{"You'll"} get email updates if you provided one during checkout</p>
      <p>Order id: <span className="underline">{params.id}</span></p>
      <p>Order status: <span className="font-bold">{order.result.status}</span></p>
      {order.result.shipments[0]?.tracking_url && (
        <>
          <p>Tracking number:</p>
          <a
            className="underline"
            href={order.result.shipments[0].tracking_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {order.result.shipments[0].tracking_number}
          </a>
        </>
      )}
      <p>Thanks for shopping with us!</p>
      <p className="text-3xl mt-2">{"☺".repeat(1008)}</p>
    </div>
  );
}

const OrderNotFound = () => (
  <div className="w-full max-w-4xl justify-center mx-auto pt-12 font-mono px-16 space-y-6">
    <h1 className="text-3xl font-bold">Order not found 😢</h1>
  </div>
);
