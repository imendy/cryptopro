const TableHeader = ({ headers }) => {
  return (
    <table className="container">
      <thead>
        <tr className="heading">
          <th>ID</th>
          <th className="hide-mobile">Image</th>
          <th>Name</th>
          <th>Price</th>
          <th className="hide-mobile_1">24h</th>
          <th className="hide-mobile">Symbol</th>
          <th className="hide-mobile">Volume</th>
          <th className="hide-mobile">Mkt Cap</th>
        </tr>
      </thead>
    </table>
    
  );
};

export default TableHeader;
