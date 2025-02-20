import React from "react";
import { Snackbar, Fade, Alert } from "@mui/material";

export default function MensajeExito({ open, onClose, mensaje }) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
      TransitionComponent={Fade}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
        {mensaje}
      </Alert>
    </Snackbar>
  );
}
