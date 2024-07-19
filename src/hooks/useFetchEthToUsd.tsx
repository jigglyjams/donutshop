import { useEffect, useState } from 'react';

type CoinbaseETHUSD = {
  data: {
    base: string;
    currency: string;
    amount: string;
  }
};

const coinbaseURL = "https://api.coinbase.com/v2/prices/ETH-USD/spot";

export const useFetchEthToUsd = () => {
  const [ethToUsd, setEthToUsd] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchExchange = async () => {
    try {
      const res = await fetch(coinbaseURL);
      const data: CoinbaseETHUSD = await res.json();
      console.log("ETH to USD:", data.data.amount);
      setEthToUsd(Number(data.data.amount));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching ETH to USD:", err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchange();
  });

  return { ethToUsd, loading, error, refetch: () => fetchExchange() };
};
