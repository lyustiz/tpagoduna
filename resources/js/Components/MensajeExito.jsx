import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';

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
