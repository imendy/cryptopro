import React, { useState, useEffect } from 'react';
import styles from '../styles/Form.module.css'

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

   useEffect(() => {
    if (amount) {
      handleConvert();
    }
  }, [fromCurrency, toCurrency]);

  const handleConvert = () => {
    const apiKey = "685419b6bedfb725bb6af07ed3dd6fef8f20a83f05c066d1eb20a10c563c7801";
    const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=${toCurrency}&tsyms=${fromCurrency}&api_key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const rate = data[fromCurrency];
        const convertedResult = amount / rate;
        setResult(convertedResult.toFixed(4));
        
        setError('');
      })
      .catch(error => {
        setResult('');
        setError('Error: Unable to fetch exchange rate.');
        console.error(error);
      });
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4">
     <div className=""> 
       <h2 className="text-center font-bold text-2xl mb-8">Currency 2 Coin Converter</h2>
              <form className="">
       <div className="flex  gap-2 my-6 justify-center  items-center">
          <label id="fromCurrencyName">{fromCurrency}{' '}:</label>
         <div className={styles.input_group}>
           <input type="text" name="amount" id="amount" placeholder="Enter Amount" required onChange={handleAmountChange} className={styles.input_text} />
         </div>
       
       </div>
       
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <select name="fromCurrency" id="fromCurrency" onChange={handleFromCurrencyChange} value={fromCurrency} className="cursor-pointer  bg-purple-400 py-2 rounded-md font-bold ">
            
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="NGN">NGN - Nigerian Naira</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="GHS">GHS - Ghanians Cedi</option>
            <option value="AUD">AUD - Australian Dollar</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="INR">INR - India Rupee</option>
            <option value="NZD">NZD - New Zealand Dollar</option>
            <option value="CHF">CHF - Swiss Franc</option>
            <option value="ZAR">ZAR - South African Rand</option>
            <option value="BGN">BGN - Bulgarian Lev</option>
            <option value="SGD">SGD - Singapore Dollar</option>
            <option value="HKD">HKD - Hong Kong Dollar</option>
            <option value="SEK">SEK - Swedish Krona</option>
            <option value="THB">THB - Thai Baht</option>
            <option value="HUF">HUF - Hungarian Forint</option>
            <option value="CNY">CNY - Chinese Yuan Renminbi</option>
            <option value="NOK">NOK - Norwegian Krone</option>
            <option value="MXN">MXN - Mexican Peso</option>
           
          </select>
          <select name="toCurrency" id="toCurrency" onChange={handleToCurrencyChange} value={toCurrency} className="cursor-pointer bg-green-300 py-2 rounded-md px-10 font-bold ">
            
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="USDT">Tether (USDT)</option>
            <option value="BNB">Binance Coin (BNB)</option>
            <option value="USDC">USD Coin (USDC)</option>
            <option value="XRP">XRP (XRP)</option>
            <option value="BUSD">Binance USD (BUSD)</option>
            <option value="ADA">cardano (ADA)</option>
            <option value="DOGE">Dogecoin (DOGE)</option>
            <option value="MATIC">Polygon (MATIC)</option>
            <option value="SOL">Solana (SOL)</option>
            <option value="DOT">Polkadot (DOT)</option>
            <option value="SHIB">Shiba Inu (SHIB)</option>
            <option value="LTC">Litecoin (LTC)</option>
            <option value="TRX">Tron (TRX)</option>
            <option value="AVAX">Avalanche (AVAX)</option>
          </select>
        </div>
          
          <div className="flex flex-col my-4 p-4 justify-center items-center">
       <div className="input-button">
           <button 
             className={styles.button} 
             type="button"
           onClick={handleConvert}
            
             >
             <h2 className="relative z-20 px-28 ">Convert</h2>
           </button>
         </div>
      
      </div>
        
       
      </form>
     
     </div>
     
      <p id="result" className="text-center font-bold mb-8 text-sm">Exchange Rate{' '}:{' '}{`${amount} ${fromCurrency} is equal to ${result} ${toCurrency}`}</p>
      <p>{error}</p>
      
    </div>
  );
};

export default CurrencyConverter
