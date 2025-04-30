import * as React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AddDeliveryAddressForm from "./AddAddress";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import LoginUserForm from "../Auth/Login";
import { useTheme } from "@mui/material/styles";
import Cart from "../Cart/Cart";

const steps = ["CheckOut", "Delivery Address", "Order Summary", "Payment"];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const queryParams = new URLSearchParams(location.search);
  const step = Math.min(Math.max(parseInt(queryParams.get("step"), 10) || 1, 1), steps.length);
  const [activeStep, setActiveStep] = React.useState(step);

  React.useEffect(() => {
    setActiveStep(step);
  }, [step]);

  const handleNext = () => {
    const nextStep = activeStep + 1;
    if (nextStep <= steps.length) {
      setActiveStep(nextStep);
      navigate(`/checkout?step=${nextStep}`);
    }
  };

  const handleStepClick = (index) => {
    setActiveStep(index + 1);
    navigate(`/checkout?step=${index + 1}`);
  };

  const handleReset = () => {
    setActiveStep(1);
    navigate(`/checkout?step=1`);
  };

  return (
    <Box className="px-0 sm:px-8 lg:px-32 mt-10" sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep - 1} alternativeLabel={isMobile}>
        {steps.map((label, index) => (
          <Step key={label} onClick={() => handleStepClick(index)} style={{ cursor: "pointer" }}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: "#ccc",
                  "&.Mui-active": {
                    color: "crimson",
                  },
                  "&.Mui-completed": {
                    color: "black",
                  },
                },
              }}
            >
              <Typography fontSize={{ xs: "0.75rem", sm: "0.875rem", md: "1rem" }}>
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="my-10">
        {activeStep > steps.length ? (
          <Box className="text-center">
            <Typography variant="h6" gutterBottom>
              All steps completed - you're finished
            </Typography>
            <Button onClick={handleReset} variant="outlined" sx={{ mt: 2 }}>
              Reset
            </Button>
          </Box>
        ) : (
          <Box className="mt-8">
            {activeStep === 1 && <Cart />}
            {activeStep === 2 && <AddDeliveryAddressForm handleNext={handleNext} />}
            {activeStep === 3 && <OrderSummary />}
            {activeStep === 4 && (
              <Typography variant="h6" className="text-center">
                Please Complete All Previous Steps To Proceed To Payment
              </Typography>
            )}
          </Box>
        )}
      </div>
    </Box>
  );
}
