import {
  Grid,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../Redux/Auth/Action";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";


export default function RegisterUserForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);

  const jwt = localStorage.getItem("jwt");

  // Form values
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  useEffect(() => {
    if (jwt) dispatch(getUser(jwt));
  }, [jwt, dispatch]);

  useEffect(() => {
    if (auth.user) {
      setSnackMessage("Registration successful");
      setOpenSnackBar(true);
    } else if (auth.error) {
      setSnackMessage(auth.error);
      setOpenSnackBar(true);
    }
  }, [auth.user, auth.error]);

  const handleClose = () => setOpenSnackBar(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!form.firstName.trim()) {
      tempErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!form.lastName.trim()) {
      tempErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!form.password.trim()) {
      tempErrors.password = "Password is required";
      isValid = false;
    } else if (form.password.length < 6) {
      tempErrors.password = "Password should be at least 6 characters";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) return;

    dispatch(register(form));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
            xs: "1rem", // for small screens (mobile)
            sm: "2rem", // for tablets
            md: "3rem", // for desktops
          },
          backgroundColor: "#fff",
          borderRadius: "1rem",
          position: "relative",
        }}
      >
        <IconButton
          onClick={() => navigate("/")}
          sx={{ position: "absolute", top: 10, right: 10, color: "#000" }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ color: "#000", fontWeight: 600, mb: 2 }}
        >
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                value={form.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                InputLabelProps={{ style: { color: "#000" } }}
                InputProps={{ style: { color: "#000" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                value={form.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                InputLabelProps={{ style: { color: "#000" } }}
                InputProps={{ style: { color: "#000" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                InputLabelProps={{ style: { color: "#000" } }}
                InputProps={{ style: { color: "#000" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputLabelProps={{ style: { color: "#000" } }}
                InputProps={{ style: { color: "#000" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    }
                  }
                }}
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
                  }
                }}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography align="center" sx={{ color: "#000" }}>
                Already have an account?
                <Button
                  onClick={() => navigate("/login")}
                  size="small"
                  sx={{
                    ml: 1,
                    color: "#000",
                    textDecoration: "underline",
                    fontWeight: 500,
                  }}
                >
                  Login
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </form>

        <Snackbar
          open={openSnackBar}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
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
