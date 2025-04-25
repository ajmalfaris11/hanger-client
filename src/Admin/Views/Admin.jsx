// ** MUI Imports
import Grid from "@mui/material/Grid";
import { useState, useEffect } from 'react';
import AdminPannel from "../../Styles/AdminPannelWrapper";
import Achivement from "../tables/Achivement";
import OverView from "../tables/OverView";
import WeeklyOverview from "../tables/WeeklyOverview";
import TotalEarning from "../tables/TotalEarning";
import CardStatsVertical from "../../Styles/CardStatsVertical";
import SalesByCountries from "../tables/SalesByContry";
import DepositWithdraw from "../tables/DepositeAndWithdraw";
import CustomersTable from "../tables/CustomersTable";
import { ThemeProvider, createTheme } from "@mui/material";
import { customTheme, darkTheme } from "../them/customeThem";
import "./Admin.css";
import RecentlyAddeddProducts from "../tables/RecentlyAddeddProducts";
import SalesOverTime from "../tables/SalesOverTime";
import RecentOrders from "../tables/RecentOrders";
import api from '../../config/api';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ProfitAndOrders from "../tables/DailyStats";
import { getUser } from "../../Redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();
  
  const [orderStats, setOrderStats] = useState({
    pending: 0,
    confirmed: 0,
    shipped: 0,
    delivered: 0,
    canceled: 0,
    total: 0,
  });

    const dispatch = useDispatch();
  

  const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector((store) => store);
  

  useEffect(() => {

    if (jwt) {
          dispatch(getUser(jwt));
        }
        if(auth){
          if (auth.user?.role !== "ADMIN") {
            navigate("/");
          }
        }

    api.get('/api/admin/orders')
      .then((response) => {
        const orders = response.data;
        const stats = {
          pending: 0,
          confirmed: 0,
          shipped: 0,
          delivered: 0,
          canceled: 0,
          total: orders.length,
        };

        orders.forEach((order) => {
          switch (order.orderStatus.toLowerCase()) {
            case 'pending':
              stats.pending++;
              break;
            case 'confirmed':
              stats.confirmed++;
              break;
            case 'shipped':
              stats.shipped++;
              break;
            case 'delivered':
              stats.delivered++;
              break;
            case 'canceled':
              stats.canceled++;
              break;
            default:
              break;
          }
          stats.total = orders.length;
        });
        setOrderStats(stats);
      })
      .catch((error) => console.error('Failed to fetch orders:', error));
  }, []);

  const getPercentage = (count) => {
    return orderStats.total ? ((count / orderStats.total) * 100).toFixed(1) : '0.0';
  };

  return (
    <div className="adminContainer ">
      <ThemeProvider theme={customTheme}>
        <AdminPannel>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Achivement />
            </Grid>
            <Grid item xs={12} md={8}>
              <OverView />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
              <Grid item xs={6} md={4} lg={2}>
                  <CardStatsVertical
                    stats={orderStats.total}
                    icon={<ListAltIcon />}
                    color="primary"
                    percentage={`${getPercentage(orderStats.total)}%`}
                    title="Total Orders"
                  />
                </Grid>
              <Grid item xs={6} md={4} lg={2}>
                  <CardStatsVertical
                    stats={orderStats.pending}
                    icon={<PendingActionsIcon />}
                    color="warning"
                    percentage={`${getPercentage(orderStats.pending)}%`}
                    title="Pending Orders"
                  />
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                  <CardStatsVertical
                    stats={orderStats.confirmed}
                    icon={<AssignmentTurnedInIcon />}
                    color="primary"
                    percentage={`${getPercentage(orderStats.confirmed)}%`}
                    title="Conformed Orders"
                  />
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                  <CardStatsVertical
                    stats={orderStats.shipped}
                    icon={<LocalShippingIcon />}
                    color="info"
                    percentage={`${getPercentage(orderStats.shipped)}%`}
                    title="Shipped Orders"
                  />
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                  <CardStatsVertical
                    stats={orderStats.delivered}
                    icon={<CheckCircleIcon />}
                    color="success"
                    percentage={`${getPercentage(orderStats.delivered)}%`}
                    title="Delivered Orderes"
                  />
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                  <CardStatsVertical
                    stats={orderStats.canceled}
                    icon={<CancelIcon />}
                    color="error"
                    percentage={`${getPercentage(orderStats.canceled)}%`}
                    title="Cancelled Orders"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <ProfitAndOrders />
            </Grid>

            <Grid item xs={12} lg={6}>
              <CustomersTable />
            </Grid>
            <Grid item xs={12} lg={6}>
              <RecentOrders />
            </Grid>
            <Grid item xs={12} lg={6}>
              <RecentlyAddeddProducts />
            </Grid>
            <Grid item xs={12} lg={6}>
              <CustomersTable />
            </Grid>
          </Grid>
        </AdminPannel>
      </ThemeProvider>
    </div>
  );
};

export default Dashboard;