import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Select,
} from "@mui/material";

import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelOrder,
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../../Redux/Admin/Orders/Action";

const OrdersTable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ status: "ALL", sort: "Newest" });
  const [orderStatus, setOrderStatus] = useState("");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { adminsOrder } = useSelector((store) => store);
  const [anchorElArray, setAnchorElArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getOrders({ jwt }));
  }, [jwt, adminsOrder.delivered, adminsOrder.shipped, adminsOrder.confirmed, adminsOrder.canceled]);

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleConfirmedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(confirmOrder(orderId));
    setOrderStatus("CONFIRMED");
  };

  const handleShippedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(shipOrder(orderId));
    setOrderStatus("SHIPPED");
  };

  const handleDeliveredOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(deliveredOrder(orderId));
    setOrderStatus("DELIVERED");
  };

  const handleCancelOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(cancelOrder(orderId));
    setOrderStatus("CANCELED");
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  // Client-side filter + sort + paginate
  const filteredAndSortedOrders = useMemo(() => {
    let filteredOrders = adminsOrder.orders;

    if (formData.status && formData.status !== "ALL") {
      filteredOrders = filteredOrders.filter(
        (order) => order.orderStatus === formData.status
      );
    }

    if (formData.sort === "Newest") {
      filteredOrders = [...filteredOrders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (formData.sort === "Older") {
      filteredOrders = [...filteredOrders].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    // If formData.sort is "All", skip sorting and return as is
    return filteredOrders;
  }, [formData.status, formData.sort, adminsOrder.orders]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedOrders.slice(startIndex, endIndex);
  }, [filteredAndSortedOrders, currentPage, itemsPerPage]);

  return (
    <Box>
      <Card className="p-3">
        <CardHeader title="Sort" />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={"ALL"}>All</MenuItem>
                <MenuItem value={"PLACED"}>PLACED</MenuItem>
                <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
                <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                <MenuItem value={"CANCELED"}>CANCELED</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                name="sort"
                value={formData.sort}
                label="Sort By"
                onChange={handleChange}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Newest"}>Newest</MenuItem>
                <MenuItem value={"Older"}>Older</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      <Card className="mt-2">
        <CardHeader title="All Orders" />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Id</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOrders.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <AvatarGroup max={4}>
                      {item.orderItems.map((orderItem) => (
                        <Avatar
                          key={orderItem._id}
                          src={orderItem.product?.imageUrl}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>
                    {item.orderItems.map((order) => (
                      <Typography key={order._id}>
                        {order.product?.title}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell>{item.totalPrice}</TableCell>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.orderStatus}
                      color={
                        item.orderStatus === "PENDING"
                          ? "info"
                          : item.orderStatus === "CONFIRMED"
                            ? "primary"
                            : item.orderStatus === "SHIPPED"
                              ? "warning"
                              : item.orderStatus === "DELIVERED"
                                ? "success"
                                : item.orderStatus === "CANCELED"
                                  ? "error"
                                  : "secondary"
                      }
                      sx={{ color: "white", fontWeight: "bold" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => handleUpdateStatusMenuClick(e, index)}
                    >
                      Status
                    </Button>
                    <Menu
                      anchorEl={anchorElArray[index]}
                      open={Boolean(anchorElArray[index])}
                      onClose={() => handleUpdateStatusMenuClose(index)}
                    >
                      <MenuItem
                        onClick={() => handleConfirmedOrder(item._id, index)}

                      >
                        CONFIRM ORDER
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleShippedOrder(item._id, index)}

                      >
                        SHIP ORDER
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleDeliveredOrder(item._id, index)}
                      >
                        DELIVER ORDER
                      </MenuItem>

                      <MenuItem
                        onClick={() => handleCancelOrder(item._id, index)}
                      >
                        CANCEL ORDER
                      </MenuItem>

                    </Menu>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteOrder(item._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card className="mt-2 flex justify-center items-center">
        <Pagination
          count={Math.ceil(filteredAndSortedOrders.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePaginationChange}
        />
      </Card>
    </Box>
  );
};

export default OrdersTable;
