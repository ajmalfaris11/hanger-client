import {
  Box,
  Typography,
  Avatar,
  Card,
  Chip,
  Grid,
  Divider,
  Button,
  Stack,
  Paper
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../Redux/Admin/Orders/Action";

const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "info";
    case "CONFIRMED":
      return "primary";
    case "SHIPPED":
      return "warning";
    case "DELIVERED":
      return "success";
    default:
      return "error";
  }
};

const CustomerOrders = () => {
  const dispatch = useDispatch();
  const { adminsOrder, auth } = useSelector((store) => store);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const chips = [
    { label: `On Shipping ${customerOrders.length}` },
    { label: "Arrived 0" },
    { label: "Canceled 0" }
  ];

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    if (adminsOrder.orders.length && auth.user?._id) {
      const filteredOrders = adminsOrder.orders.filter(
        (order) => order.user === auth.user._id
      );
      setCustomerOrders(filteredOrders);
    }
  }, [adminsOrder.orders, auth.user?._id]);

  if (!customerOrders.length) {
    return (
      <Box p={4}>
        <Typography variant="h6" textAlign="center">
          You have no orders yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 2, md: 4 }} maxWidth="lg" mx="auto">
      <Typography variant="h4" fontWeight={500} mb={2}>
        My Orders
      </Typography>

      {/* Filter Chips */}
      <Stack
        direction="row"
        spacing={2}
        mb={4}
        sx={{
          width: "100%",
          backgroundColor: "#f5f5f5",
          borderRadius: "50px",
          justifyContent: "space-between",
          p: 1
        }}
      >
        {chips.map((chip, index) => (
          <Box
            key={index}
            onClick={() => setActiveIndex(index)}
            sx={{
              backgroundColor: activeIndex === index ? "#fff" : "transparent",
              borderRadius: "50px",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: 1,
              cursor: "pointer",
              transition: "background-color 0.3s ease"
            }}
          >
            <Chip
              label={chip.label}
              sx={{
                backgroundColor: "transparent !important",
                fontWeight: 500
              }}
            />
          </Box>
        ))}
      </Stack>

      {/* Order Cards */}
      <Grid container spacing={3}>
        {customerOrders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={6}>
                  <Typography fontWeight={600} gutterBottom>
                    Order #{order._id.slice(-6)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Estimated Arrival:{" "}
                    {(() => {
                      const createdAt = new Date(order.createdAt);
                      const delivery = new Date(createdAt);
                      delivery.setDate(createdAt.getDate() + 7);
                      return delivery.toLocaleDateString();
                    })()}
                  </Typography>
                </Grid>

                <Grid item xs={6} sx={{display:"flex", flexDirection:"column", alignItems:"flex-end"}}>
                  <Typography fontWeight={600} mb={1}>
                    ₹
                    {order.orderItems.reduce(
                      (total, item) =>
                        total + item.discountedPrice * item.quantity,
                      0
                    )}{" "}
                    ({order.orderItems.length} items)
                  </Typography>

                    <Chip
                      label={order.orderStatus}
                      variant="filled"
                      sx={{
                        fontWeight: "bold",
                        color: "white !important",
                        backgroundColor:"black",
                        borderRadius: "6px",
                        width: "100px",
                      }}
                    />

                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Grid
                container
                spacing={2}
                sx={{ height: "120px", overflowY: "scroll" }}
              >
                {order.orderItems.map((item) => (
                  <Grid item xs={12} key={item._id}>
                    <Box display="flex" alignItems="center" gap={2} >
                      <Avatar
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: 2,
                          "& img": {
                            objectFit: "cover",
                            objectPosition: "top"
                          }
                        }}
                      />
                      <Box>
                        <Typography fontWeight={500}>
                          {item.product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹{item.discountedPrice} × {item.quantity} | Size:{" "}
                          {item.size || "-"}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomerOrders;
