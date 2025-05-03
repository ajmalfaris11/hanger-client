import * as React from "react";
import {
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  Typography,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../../Redux/Auth/Action";
import { useEffect, useState } from "react";

export default function LoginUserForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) dispatch(getUser(jwt));
  }, [jwt, dispatch]);

  useEffect(() => {
    if (auth.user) {
      setSnackMessage("Login Successful");
      setOpenSnackBar(true);
    } else if (auth.error) {
      setSnackMessage(auth.error);
      setOpenSnackBar(true);
    }
  }, [auth.user, auth.error]);

  const handleCloseSnakbar = () => setOpenSnackBar(false);

  const validate = () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Enter a valid email address");
      valid = false;
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters");
      valid = false;
    }

    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    dispatch(login({ email, password }));
  };

  if (location.pathname !== "/login") return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 500,
          width: "100%",
          padding: {
            xs: "1.5rem", // for small screens (mobile)
            sm: "2rem", // for tablets
            md: "3rem", // for desktops
          },
          backgroundColor: "#fff",
          borderRadius: "1rem",
          position: "relative",
        }}
      >
        {/* Close Button at Top Left */}
        <IconButton
          onClick={() => navigate("/")}
          sx={{ position: "absolute", top: 10, right: 10, color: "#000" }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Box position="relative" mb={2}>

          {/* Centered Title */}
          <Box display="flex" justifyContent="center">
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "#000", fontWeight: 600 }}
            >
              Sign In
            </Typography>
          </Box>
        </Box>


        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                InputLabelProps={{ style: { color: "#000" } }}
                InputProps={{ style: { color: "#000" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                InputLabelProps={{ style: { color: "#000" } }}
                InputProps={{ style: { color: "#000" } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "0.8rem",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" sx={{ color: "#000" }}>
                Don't have an account?
                <Button
                  onClick={() => navigate("/register")}
                  size="small"
                  sx={{
                    ml: 1,
                    color: "#000",
                    textDecoration: "underline",
                    fontWeight: 500,
                  }}
                >
                  Create account
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleCloseSnakbar}
        >
          <Alert
            onClose={handleCloseSnakbar}
            severity={auth.error ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {snackMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}
