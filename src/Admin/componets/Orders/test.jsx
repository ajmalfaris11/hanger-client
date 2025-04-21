import React, { useEffect, useState, useMemo } from "react";
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
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../../Redux/Admin/Orders/Action";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { adminsOrder } = useSelector((store) => store);

  const [formData, setFormData] = useState({ status: "ALL", sort: "" });
  const [anchorElArray, setAnchorElArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Fetch all orders once on component mount
  useEffect(() => {
    dispatch(getOrders({ jwt })); // Fetch all orders without pagination
  }, [jwt]);

  // Handle status menu open
  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  // Handle status menu close
  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  // Handle form data changes for filtering and sorting
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
    console.log("Updated formData:", { ...formData, [name]: value }); // Debug log
  };

  // Handle pagination changes
  const handlePaginationChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle order status updates
  const handleConfirmedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(confirmOrder(orderId)).then(() => {
      updateOrderStatusLocally(orderId, "CONFIRMED");
    });
  };
  const handleShippedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(shipOrder(orderId)).then(() => {
      updateOrderStatusLocally(orderId, "SHIPPED");
    });
  };

  const handleDeliveredOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(deliveredOrder(orderId)).then(() => {
      updateOrderStatusLocally(orderId, "DELIVERED");
    });
  };

  // Handle order deletion
  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  // Filter, sort, and paginate orders
  const filteredAndSortedOrders = useMemo(() => {
    let filteredOrders = adminsOrder.orders;

    // Apply status filter
    if (formData.status && formData.status !== "ALL") {
      filteredOrders = filteredOrders.filter((order) => order.orderStatus === formData.status);
    }

    // Apply sorting
    if (formData.sort === "Newest") {
      filteredOrders = [...filteredOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (formData.sort === "Older") {
      filteredOrders = [...filteredOrders].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return filteredOrders;
  }, [formData.status, formData.sort, adminsOrder.orders]);

  // Paginate the filtered and sorted orders
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedOrders.slice(startIndex, endIndex);
  }, [filteredAndSortedOrders, currentPage, itemsPerPage]);

  return (
    <Box>
      {/* Filter and Sort Section */}
      <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value={"ALL"}>ALL</MenuItem>
              <MenuItem value={"PLACED"}>PLACED</MenuItem>
              <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
              <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
              <MenuItem value={"CANCELED"}>CANCELED</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              name="sort"
              value={formData.sort}
              onChange={handleChange}
            >
              <MenuItem value={"Newest"}>Newest</MenuItem>
              <MenuItem value={"Older"}>Older</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* Orders Table */}
      <Card className="mt-2">
        <CardHeader
          title="All Orders"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="orders table">
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
              {paginatedOrders?.map((item, index) => (
                <TableRow key={item._id} hover>
                  <TableCell>
                    <AvatarGroup max={4}>
                      {item.orderItems.map((orderItem) => (
                        <Avatar
                          key={orderItem.product?.id}
                          alt={orderItem.product?.title}
                          src={orderItem.product?.imageUrl}
                        />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography>
                        {item.orderItems.map((order) => (
                          <span key={order.product?.id}>
                            {order.product?.title},{" "}
                          </span>
                        ))}
                      </Typography>
                      <Typography variant="caption">
                        {item.orderItems.map((order) => (
                          <span key={order.product?.id}>
                            {order.product?.brand},{" "}
                          </span>
                        ))}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{item.totalPrice}</TableCell>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.orderStatus}
                      color={
                        item.orderStatus === "PENDING"
                          ? "info"
                          : item.orderStatus === "DELIVERED"
                          ? "success"
                          : "secondary"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={(event) =>
                        handleUpdateStatusMenuClick(event, index)
                      }
                    >
                      Status
                    </Button>
                    <Menu
                      anchorEl={anchorElArray[index]}
                      open={Boolean(anchorElArray[index])}
                      onClose={() => handleUpdateStatusMenuClose(index)}
                    >
                      <MenuItem
                        onClick={() =>
                          handleConfirmedOrder(item._id, index)
                        }
                        disabled={
                          item.orderStatus === "DELIVERED" ||
                          item.orderStatus === "SHIPPED" ||
                          item.orderStatus === "CONFIRMED"
                        }
                      >
                        Confirm Order
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleShippedOrder(item._id, index)}
                        disabled={
                          item.orderStatus === "DELIVERED" ||
                          item.orderStatus === "SHIPPED"
                        }
                      >
                        Ship Order
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleDeliveredOrder(item._id, index)}
                        disabled={item.orderStatus === "DELIVERED"}
                      >
                        Deliver Order
                      </MenuItem>
                    </Menu>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteOrder(item._id)}
                      variant="text"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Pagination */}
      <Card className="mt-2">
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