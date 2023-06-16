import styles from '../styles/Form.module.css'
import { useState, useEffect } from 'react'
import CurrencyConverter from '../components/CurrencyConverter'
import Loading from '../components/Loading';
import CryptoTable from '../components/CryptoTable';
import SearchBar from '../components/SearchBar';
import Link from 'next/link';


function UserDashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);

useEffect(() => {
  const fetchCoins = async () => {
    try {
      const response = await fetch('/api/coins');
      const data = await response.json();
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchTrendingCoins = async () => {
    try {
      const response = await fetch('/api/trending-coins');
      const data = await response.json();
      setTrendingCoins(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchCoins();
  fetchTrendingCoins();
}, []);

  const handleSearch = (searchTerm) => {
  const results = coins?.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  setSearchResults(results);
};

  return (
    <div className="p-4 min-[560px]:px-16 md:px-40">
      <CurrencyConverter />
     
      <SearchBar handleSearch={handleSearch} />
      <CryptoTable coins={searchResults.length > 0 ? searchResults : coins} />
    </div>
  );
}

export default UserDashboard;
