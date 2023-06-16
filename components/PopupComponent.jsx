import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const PopupComponent = ({ coin, onClose }) => {
  const [chartData, setChartData] = useState(null);
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=7`);
        setChartData(response.data.prices);
      } catch (error) {
        console.log(error);
      }
    };

    fetchChartData();
  }, [coin.id]);

  useEffect(() => {
    if (chartData) {
      // Create or update the chart
      createOrUpdateChart();
    }
  }, [chartData]);

  const createOrUpdateChart = () => {
    if (!chartContainerRef.current) return;

    if (chartInstanceRef.current) {
      // Destroy the previous chart instance
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(chartContainerRef.current, {
      type: 'line',
      data: {
        labels: chartData.map((data) => new Date(data[0]).toLocaleDateString()),
        datasets: [
          {
            label: 'Price',
            data: chartData.map((data) => data[1]),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
          },
        },
      },
    });
  };

  return (
    <div className="popup-modal">
      <div className="popup-overlay"></div>
      <div className="popup-content">
        <h2 className="my-8 flex items-center justify-center font-bold text-purple-400">{coin.name} Price Chart</h2>
        <p>Here, you can view the price chart for {coin.name} over the past 7 days.</p>
        <canvas ref={chartContainerRef} width="400" height="200"></canvas>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopupComponent;
