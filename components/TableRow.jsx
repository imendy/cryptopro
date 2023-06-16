import Link from 'next/link';

const TableRow = ({ coin, coinID }) => {
  
  return (
    
     
    <tr className="coin-row text-sm">
      <td>{coinID}</td>
      <td>
         <Link href={`/coin/${coin.id}`}>
           <a> 
            <img src={coin.image} alt={coin.name} />
           </a>
        </Link>
      </td>
      <td className="ml-8">
       
          {coin.name}
        
      </td>
      <td className="ml-8">${coin.current_price?.toFixed(2)}</td>
      <td
        style={{
          color: coin.price_change_percentage_24h > 0 ? '#2e7d32' : '#d50000',
        }}
        className="hide-mobile_1"
      >
        {coin.price_change_percentage_24h?.toFixed(2)}%
      </td>
      <td className="hide-mobile">{coin.symbol}</td>
      <td className="hide-mobile">${coin.total_volume.toLocaleString()}</td>
      <td className="hide-mobile">${coin.market_cap.toLocaleString()}</td>
    </tr>
  
  );
};

export default TableRow;
