import { useEffect, useState, useRef } from 'react';

type CoinbaseSpotResponse = {
  data: {
    base: string;
    currency: string;
    amount: string;
  }
};

export const useFetchEthToUsd = () => {
  const [ethToUsd, setEthToUsd] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const fetchedRef = useRef(false);

  const fetchExchange = async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    console.debug("Fetching ETH to USD exchange rate...");
    setLoading(true);
    try {
      const res = await fetch("https://api.coinbase.com/v2/prices/ETH-USD/spot", { cache: "no-store" });
      const data: CoinbaseSpotResponse = await res.json();
      console.log("ETH to USD:", data.data.amount);
      setEthToUsd(Number(data.data.amount));
    } catch (err) {
      console.error("Error fetching ETH to USD:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchange();
  }, []);

  const refetch = () => {
    fetchedRef.current = false;
    fetchExchange();
  };

  return { ethToUsd, loading, error, refetch };
};
