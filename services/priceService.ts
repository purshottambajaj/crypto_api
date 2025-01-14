import axios from 'axios';
import NodeCache from 'node-cache'; // Import NodeCache to store cached data in memory

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';
// URL for CoinGecko API to get simple price data

const priceCache = new NodeCache({ stdTTL: 60 });
// Create a new NodeCache instance with a default TTL (Time To Live) of 60 seconds



// The function to fetch the current cryptocurrency price from CoinGecko API
export const getCryptoPrice = async (cryptoId: string, vsCurrency: string): Promise<number | null> => {
  // Create a unique cache key based on cryptocurrency ID and the target currency
  const cacheKey = `${cryptoId}-${vsCurrency}`;
  const cachedPrice = priceCache.get<number>(cacheKey);

  if (cachedPrice !== undefined) {
    return cachedPrice;
  }

  try {
     // If the price is not cached, make an HTTP GET request to CoinGecko API
    const response = await axios.get(`${COINGECKO_API_URL}?ids=${cryptoId}&vs_currencies=${vsCurrency}`);
    const price = response.data[cryptoId]?.[vsCurrency] || null;
    if (price !== null) {
      priceCache.set(cacheKey, price);
    }
    return price;
  } catch (error) {
    console.error('Error fetching cryptocurrency price:', error);
    return null;
  }
};
