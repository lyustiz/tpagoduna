import React from 'react';
import { Snackbar, Fade, Alert } from '@mui/material';

export default function MensajeError({ open, onClose, errors }) {

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
      TransitionComponent={Fade}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity={errors.error ? 'error' : 'warning'}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {errors.error || errors.warning}
      </Alert>
    </Snackbar>
  );
}