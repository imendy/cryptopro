import fetch from 'isomorphic-unfetch';

export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    );
    const data = await response.json();

    const trendingResponse = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
    );
    const trendingData = await trendingResponse.json();

    res.status(200).json({ coins: data, trendingCoins: trendingData });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}
