import { useEffect, useState, useRef } from 'react';

type InitOrderResponse = {
  id: string;
  idHash: string;
};

export const useInitOrder = () => {
  const [orderIdObj, setOrderIdObj] = useState<InitOrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchedRef = useRef(false);

  const initOrder = async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    console.debug("Fetching init order id...");
    setLoading(true);
    try {
      const res = await fetch("/api/init", { cache: "no-store" });
      const data: InitOrderResponse = await res.json();
      console.log("order id:", data);
      setOrderIdObj(data);
    } catch (err) {
      console.error("Error fetching init order id:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initOrder();
  }, []);

  const refetch = () => {
    fetchedRef.current = false;
    initOrder();
  };

  return { orderIdObj, loading, error, refetch };
};
