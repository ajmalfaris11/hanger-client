import * as React from "react";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../Redux/Customers/Order/Action";
import { useState } from "react";

export default function AddDeliveryAddressForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };

    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
    handleNext();
  };

  const handleCreateOrder = (item) => {
    dispatch(createOrder({ address: item, jwt, navigate }));
    handleNext();
  };

  const customFieldStyle = {
    "& label.Mui-focused": {
      color: "#000",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#000",
      },
    },
  };

  return (
    <Grid container >
      {/* Optional saved address section (disabled for now) */}
      <Grid item xs={12} lg={5}>
        {/* Future: Add saved address selection with "Deliver Here" buttons */}
      </Grid>

      <Grid item xs={12} lg={7}>
        <Box
          className="rounded-md shadow-md p-5"
          sx={{ border: "1px solid #e0e0e0", borderRadius: "10px" }}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2, textAlign: "center" }}>
            ADD NEW DELIVERY ADDRESS
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  autoComplete="given-name"
                  sx={customFieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  autoComplete="given-name"
                  sx={customFieldStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address"
                  multiline
                  rows={4}
                  sx={customFieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  sx={customFieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  sx={customFieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  sx={customFieldStyle}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  autoComplete="tel"
                  sx={customFieldStyle}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{
                    padding: ".9rem 1.5rem",
                    backgroundColor: "#000",
                    "&:hover": { backgroundColor: "#000" },
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Deliver Here
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
