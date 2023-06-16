import { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { BeatLoader } from 'react-spinners';
import PopupComponent from './PopupComponent';

function CoinDetail({ coinId }) {
  const [coinDetails, setCoinDetails] = useState(null);
  const [loading, setLoading] = useState(true);
   const [showPopup, setShowPopup] = useState(false); // State for showing/hiding the popup

  // Rest of the code...

  const handleButtonClick = () => {
    setShowPopup(true); // Show the popup when the button is clicked
  };

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        setCoinDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [coinId]);

  if (loading) {
    return <div className="flex justify-center items-center"><BeatLoader color="#c672f3" loading={true} /></div>;
  }

  if (!coinDetails) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-16">
      <div className="flex gap-2 justify-center items-center mr-12">
        <img
          src={coinDetails.image.large}
          alt={coinDetails.name}
          className="w-[50px] h-[50px]"
        />
        <h2 className="font-medium text-lg">{coinDetails.name}</h2>
      </div>

      <p className="font-medium text-lg">Symbol: {coinDetails.symbol}</p>

      <p className="font-medium text-lg">Current Price: {coinDetails.market_data.current_price.usd}</p>

      <div className="rank">
        <span className="rank-btn mt-2">Rank # {coinDetails.market_cap_rank}</span>
      </div>

       <button onClick={handleButtonClick} className="rank-btn-1 mt-2">Show Chart</button>
      {showPopup && <PopupComponent coin={coinDetails} onClose={() => setShowPopup(false)} />}

      <table className="my-8">
        <thead className="">
          <tr>
            <th>1h</th>
            <th>24h</th>
            <th>7d</th>
            <th>14d</th>
            <th>30d</th>
            <th>1yr</th>
          </tr>
        </thead>
        <tbody className="">
          <tr>
            <td>{coinDetails.market_data?.price_change_percentage_1h_in_currency ? <p>{coinDetails.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : null}</td>
            <td>{coinDetails.market_data?.price_change_percentage_24h_in_currency ? <p>{coinDetails.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : null}</td>
            <td>{coinDetails.market_data?.price_change_percentage_7d_in_currency ? <p>{coinDetails.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : null}</td>
            <td>{coinDetails.market_data?.price_change_percentage_14d_in_currency ? <p>{coinDetails.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : null}</td>
            <td>{coinDetails.market_data?.price_change_percentage_30d_in_currency ? <p>{coinDetails.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : null}</td>
            <td>{coinDetails.market_data?.price_change_percentage_1y_in_currency ? <p>{coinDetails.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p> : null}</td>
          </tr>
        </tbody>
      </table>
       <div className="content">
         <div className="stats ">
        <div className="left">
          <div className="row">
            <h4>24 Hour Low</h4>
            {coinDetails.market_data?.low_24h ? <p>${coinDetails.market_data.low_24h.usd.toLocaleString()}</p> : null}
          </div>
          <div className="row">
            <h4>24 Hour High</h4>
            {coinDetails.market_data?.high_24h ? <p>${coinDetails.market_data.high_24h.usd.toLocaleString()}</p> : null}
          </div>
        </div>
        <div className="right">
          <div className="row">
            <h4 className="mr-4">Market Cap</h4>
            {coinDetails.market_data?.market_cap ? <p>${coinDetails.market_data.market_cap.usd.toLocaleString()}</p> : null}
          </div>
          <div className="row">
            <h4>Circulating Supply</h4>
            {coinDetails.market_data ? <p>{coinDetails.market_data.circulating_supply}</p> : null}
          </div>
        </div>
      </div>
       </div>
     

      <div className="about p-6 min-[560px] px-16 md:px-40 md:p-8">
        <h3 className="font-bold text-2xl my-8 mb-8">About</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(coinDetails.description ? coinDetails.description.en : ''),
          }}
        ></div>
      </div>
    </div>
  );
}

export default CoinDetail;
