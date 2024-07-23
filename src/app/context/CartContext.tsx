import { VariantName } from "@/components/ProductImages";
import { AddressInfo } from "@/lib/printful/types";
import { createContext, useContext, useState, ReactNode } from 'react';

type CartContextType = {
  recipient: AddressInfo;
  variant: VariantName;
  setRecipient: (recipient: AddressInfo) => void;
  setVariant: (itemVariant: VariantName) => void;
  clearRecipient: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [recipient, setRecipient] = useState<AddressInfo>({
    email: "",
    name: "",
    address1: "",
    address2: "",
    city: "",
    state_code: "",
    state_name: "",
    zip: "",
    country_code: "US",
    country_name: "United States",
  });
  const [variant, setVariant] = useState<VariantName>("navy");

  const clearRecipient = () => {
    setRecipient({
      email: "",
      name: "",
      address1: "",
      address2: "",
      city: "",
      state_code: "",
      state_name: "",
      zip: "",
      country_code: "US",
      country_name: "United States",
    });
  };

  return (
    <CartContext.Provider value={{ recipient, variant, setRecipient, setVariant, clearRecipient }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
