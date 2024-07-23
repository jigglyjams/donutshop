import { createHmac } from "crypto";

const { ORDER_SECRET } = process.env
if (!ORDER_SECRET) throw new Error("Missing ORDER_SECRET")

export const secretHash = (data: string) => {
  const hmac = createHmac("sha256", ORDER_SECRET as string)
  return hmac.update(data).digest("hex")
}
