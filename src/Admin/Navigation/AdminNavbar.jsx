import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import hangerLogo from "../../Data/logo/hanger_white_logo.png";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom";
import { deepPurple } from '@mui/material/colors';


export default function AdminNavbar({ handleSideBarViewInMobile, isLargeScreen }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "rgb(0, 0, 22)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left: Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {!isLargeScreen && (<IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleSideBarViewInMobile}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>)}

            <img
              src={hangerLogo}
              alt="Hanger"
              className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]"
            />
          </Box>

          {/* Center: Title */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "16px", sm: "18px", md: "20px" },
                letterSpacing: "0.5px",
                color: "white",

              }}
            >
              HANGER ADMIN PANEL
            </Typography>
          </Box>

          {/* Right: Icons (only for large screens) */}
          {isLargeScreen && (
            <Box sx={{ display: "flex", gap: 1.5 }}>
              <IconButton size="large" color="inherit">
                <MailIcon />
              </IconButton>
              <IconButton size="large" color="inherit">
                <NotificationsIcon />
              </IconButton>
              <IconButton
                size="large"
                onClick={() => navigate('profile')}
                sx={{
                  color: location.pathname === '/admin/profile' ? deepPurple[400] : 'inherit',
                }}
              >
                <AccountCircle />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}