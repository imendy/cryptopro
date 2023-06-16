import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Pagination from '@material-ui/lab/Pagination';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { BeatLoader } from 'react-spinners';

const useStyles = makeStyles({
  container: {
    marginBottom: '20px',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    '& .MuiPagination-root': {
      '& ul': {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        justifyContent: 'center',
        '& li': {
          color: 'red', // Change the color of the other numbers
          '&.Mui-selected': {
            color: 'blue', // Change the color of the selected number
          },
        },
      },
    },
  },
});

const CryptoTable = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [coins, setCoins] = useState([]);

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        );
        if (response.ok) {
          const data = await response.json();
          setCoins(data);
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCoins();
  }, []);

  const totalPages = Math.ceil(coins.length / 10);
  const displayedCoins = coins.slice(startIndex, endIndex);

  const handleChangePage = (_, page) => {
    setCurrentPage(page);
    window.scrollTo(0, 300); // Scroll to the top of the table
  };

  if (!coins.length) {
    // Display a loading state or placeholder content while data is being fetched
    return (
      <div className="flex justify-center items-center">
        <BeatLoader color="#c672f3" loading={true} />
      </div>
    );
  }

  return (
    <div className="container">
      <TableContainer className={classes.container}>
        <Table>
          <TableHeader />
          <TableBody className="cryptoTableBody">
            {displayedCoins.map((coin, index) => (
              <TableRow
                coin={coin}
                coinID={startIndex + index + 1}
                key={coin.id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.pagination}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          color="secondary"
        />
      </div>
    </div>
  );
};

export default CryptoTable;

