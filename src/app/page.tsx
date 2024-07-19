import SingleProduct from "@/components/SingleProduct";
import Link from "next/link";

export default function Index() {
  return (
    <div className="text-center space-y-10">
      <SingleProduct />
      <div>
        <Link
          className="bg-blue-800 hover:bg-blue-900 text-white font-mono py-3 px-6 rounded-md"
          href="/checkout"
        >
            Checkout
        </Link>
      </div>
    </div>
  )
}
