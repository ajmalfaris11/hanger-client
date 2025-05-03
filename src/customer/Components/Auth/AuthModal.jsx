import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Modal, Alert, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import RegisterUserForm from "./Register";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginUserForm from "./Login";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",   // for small screens (mobile)
    sm: "70%",   // for tablets
    md: "500px", // for desktops
  },
};

export default function AuthModal({ handleClose, open }) {
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      handleClose();
      if (auth.user?.role === "ADMIN") {
        navigate("/admin");
      }
    }
  }, [auth.user]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          
          {location.pathname === "/login" ? (
            <LoginUserForm />
          ) : (
            <RegisterUserForm />
          )}
        </Box>
      </Modal>
    </>
  );
}
