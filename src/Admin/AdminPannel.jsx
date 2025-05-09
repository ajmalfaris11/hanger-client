import * as React from "react";
import { Box, Avatar, Drawer, CssBaseline, Toolbar, List, Divider, ListItem, ListItemText, ListItemButton, ListItemIcon, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import { deepPurple } from "@mui/material/colors";
import { customTheme } from "./them/customeThem";
import AdminNavbar from "./Navigation/AdminNavbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Views/Admin";
import CreateProductForm from "./componets/createProduct/CreateProductFrom";
import UpdateProductForm from "./componets/updateProduct/UpdateProduct";
import ProductsTable from "./componets/Products/ProductsTable";
import OrdersTable from "./componets/Orders/OrdersTable";
import Customers from "./componets/customers/customers";
import Users from "./componets/users/users";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../Redux/Auth/Action";
import { useEffect } from "react";
import "./AdminPannel.css";

import DashboardIcon from '@mui/icons-material/SpaceDashboard';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import GroupIcon from '@mui/icons-material/Group';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import UserProfile from "./componets/profile/profile";

const drawerWidth = 240;
const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <Inventory2Icon /> },
  { name: "Customers", path: "/admin/customers", icon: <GroupIcon /> },
  { name: "Users", path: "/admin/users", icon: <ManageAccountsIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <ShoppingBagIcon /> },
  { name: "Add Product", path: "/admin/product/create", icon: <AddCircleOutlineIcon /> },
];

// Add additional menu items for small screens
const smallScreenMenu = [
  { name: "Messages", path: "/admin/messages", icon: <ChatIcon /> },
  { name: "Notifications", path: "/admin/notifications", icon: <NotificationsActiveIcon /> },
  { name: "Profile", path: "/admin/profile", icon: <AccountBoxIcon /> },
];

export default function AdminPannel() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt]);

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {isLargeScreen && <Toolbar />}
      <List sx={{ marginTop: isLargeScreen ? "0px" : "60px" }}>
        {menu.map((item) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}
          >
            <ListItemButton
              selected={window.location.pathname === item.path}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: deepPurple[700],
                  color: "white",
                  "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                    color: "white",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}

        {/* Add additional icons for small screens */}
        {!isLargeScreen &&
          smallScreenMenu.map((item) => (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => navigate(item.path)}
            >
              <ListItemButton>
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>

      <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider />
        <ListItem disablePadding onClick={handleLogout}>
          <ListItemButton>
            <Avatar
              sx={{
                bgcolor: deepPurple[500],
                color: "white",
                cursor: "pointer",
                mr: 1,
              }}
            >
              {auth.user?.firstName
                ? auth.user.firstName[0].toUpperCase()
                : "A"}
            </Avatar>
            <ListItemText primary={"Logout"} />
            <ListItemIcon>
              <LogoutIcon sx={{ color: "gray" }} />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const toggleSideBar = () => {
    setSideBarVisible((prev) => !prev); // Toggles the sidebar visibility
  };

  const drawerVariant = isLargeScreen ? "permanent" : "temporary";

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: `${isLargeScreen ? "flex" : "block"}` }}>
        <CssBaseline />

        <AdminNavbar
          handleSideBarViewInMobile={toggleSideBar}
          isLargeScreen={isLargeScreen}

        />
        <Drawer
          variant={drawerVariant}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open={isLargeScreen || sideBarVisible}
          onClose={() => setSideBarVisible(false)}
        >
          {drawer}
        </Drawer>

        <Box
          className="adminContainer"
          component="main"
          sx={{ flexGrow: 1 }}
        >
          <Toolbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product/create" element={<CreateProductForm />} />
            <Route
              path="/product/update/:productId"
              element={<UpdateProductForm />}
            />
            <Route path="/products" element={<ProductsTable />} />
            <Route path="/orders" element={<OrdersTable />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}