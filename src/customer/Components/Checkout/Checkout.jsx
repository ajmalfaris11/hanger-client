import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddDeliveryAddressForm from "./AddAddress";
import { useLocation, useNavigate } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import LoginUserForm from "../Auth/Login";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const step = Math.min(Math.max(parseInt(queryParams.get("step"), 10) || 1, 1), steps.length); // Validate step
  const [activeStep, setActiveStep] = React.useState(step);
  const [skipped, setSkipped] = React.useState(new Set());

  React.useEffect(() => {
    setActiveStep(step);
  }, [step]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      const nextStep = prevActiveStep + 1;
      navigate(`/checkout?step=${nextStep}`);
      return nextStep;
    });
  };

  const handleBack = () => {
    if (activeStep > 1) {
      navigate(`/checkout?step=${activeStep - 1}`);
    }
  };

  const handleReset = () => {
    setActiveStep(1);
    navigate(`/checkout?step=1`);
  };

  return (
    <Box className="px-5 lg:px-32 mt-10" sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} aria-label={`Step ${index + 2}: ${label}`}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: 'white', 
                  '&.Mui-active': {
                    color: 'crimson', 
                  },
                  '&.Mui-completed': {
                    color: 'black', // completed step color
                  },
                },
              }}
            >
              <Typography>{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 1}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>

          <div className="my-5">
            {activeStep === 1 && <LoginUserForm />}
            {activeStep === 2 && <AddDeliveryAddressForm handleNext={handleNext} />}
            {activeStep === 3 && <OrderSummary />}
            {activeStep === 4 && <Typography>Payment Step</Typography>}
          </div>
        </React.Fragment>
      )}
    </Box>
  );
}