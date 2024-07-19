import { AddressInfo } from "@/lib/printful/types";
import { countries } from "@/lib/printful/countries";

const US_STATES = countries.find((c) => c.name === "United States")?.states || [];

export default function ShippingAddressForm({
  recipient,
  setRecipient
}: {
  recipient: AddressInfo;
  setRecipient: (data: AddressInfo) => void;
}) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let state_code = recipient.state_code;
    let state_name = recipient.state_name;
    const input = e.target.value;
    if (e.target.name === "state_name") {
      const foundByName = US_STATES.find((c) => c.name.toLowerCase() === input.toLowerCase());
      if (foundByName) {state_code = foundByName.code; console.log("found by name", state_code, state_name) }
      const foundByCode = US_STATES.find((c) => c.code.toLowerCase() === input.toLowerCase());
      if (foundByCode) {
        state_name = foundByCode.name;
        state_code = foundByCode.code;
        console.log("found by code", state_code, state_name)
      }
    }
    setRecipient({
      ...recipient,
      state_code,
      state_name,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pb-12 font-mono">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

        {/* Email */}
        <div className="sm:col-span-4">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            Email (optional for shipping updates)
          </label>
          <div>
            <input
              id="email" name="email" type="email" autoComplete="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
              value={recipient.email || ""}
            />
          </div>
        </div>

        {/* Name */}
        <div className="sm:col-span-3">
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            Name
          </label>
          <div>
            <input
              type="text" name="name" id="name" autoComplete="name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
              value={recipient.name || ""}
            />
          </div>
        </div>

        {/* Street Address */}
        <div className="col-span-full">
          <label htmlFor="address1" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            Street address
          </label>
          <div>
            <input
              type="text" name="address1" id="address1" autoComplete="address-line1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
              value={recipient.address1 || ""}
            />
          </div>
        </div>

        {/* Street Address Line 2 */}
        <div className="col-span-full">
          <label htmlFor="address2" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            Apartment, suite, etc. (optional)
          </label>
          <div>
            <input
              type="text" name="address2" id="address2" autoComplete="address-line2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
              value={recipient.address2 || ""}
            />
          </div>
        </div>

        {/* City */}
        <div className="sm:col-span-2 sm:col-start-1">
          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            City
          </label>
          <div>
            <input
              type="text" name="city" id="city" autoComplete="address-level2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
              value={recipient.city || ""}
            />
          </div>
        </div>

        {/* State */}
        <div className="sm:col-span-2">
          <label htmlFor="state_name" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            State
          </label>
          <div>
            <input
              type="text" name="state_name" id="state_name" autoComplete="address-level1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
              value={recipient.state_name || ""}
            />
          </div>
        </div>

        {/* Zip code */}
        <div className="sm:col-span-2">
          <label htmlFor="zip" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
            ZIP
          </label>
          <div>
            <input
              type="text" name="zip" id="zip" autoComplete="postal-code"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={handleChange}
              value={recipient.zip || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}