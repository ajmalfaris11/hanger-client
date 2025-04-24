import React, { useEffect, useState } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { Line } from 'react-chartjs-2';
import api from '../../config/api';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ProfitAndOrders = () => {
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [dailyLabels, setDailyLabels] = useState([]);
  const [dailyProfits, setDailyProfits] = useState([]);
  const [dailyOrderCounts, setDailyOrderCounts] = useState([]);

  useEffect(() => {
    api.get('/api/admin/orders')
      .then((response) => {
        const orders = response.data || [];
  
        let totalProfit = 0;
        const dailyMap = {};
  
        orders.forEach(order => {
          const price = order.totalDiscountedPrice || 0;
          totalProfit += price;
  
          const date = new Date(order.orderDate).toLocaleDateString();
  
          if (!dailyMap[date]) {
            dailyMap[date] = { profit: 0, orders: 0 };
          }
  
          dailyMap[date].profit += price;
          dailyMap[date].orders += 1;
        });
  
        const sortedDates = Object.keys(dailyMap).sort(
          (a, b) => new Date(a) - new Date(b)
        );
  
        const dailyLabels = sortedDates;
        const dailyProfits = sortedDates.map(date => dailyMap[date].profit);
        const dailyOrderCounts = sortedDates.map(date => dailyMap[date].orders);
  
        setTotalProfit(totalProfit);
        setTotalOrders(orders.length);
        setDailyLabels(dailyLabels);
        setDailyProfits(dailyProfits);
        setDailyOrderCounts(dailyOrderCounts);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });
  }, []);
  

  const profitChartData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Daily Profit',
        data: dailyProfits,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const ordersChartData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Daily Orders',
        data: dailyOrderCounts,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Total Profit</Typography>
          <Typography variant="h4" sx={{ mb: 2 }}>₹{totalProfit}</Typography>
          <Line data={profitChartData} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Total Orders</Typography>
          <Typography variant="h4" sx={{ mb: 2 }}>{totalOrders}</Typography>
          <Line data={ordersChartData} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfitAndOrders;
