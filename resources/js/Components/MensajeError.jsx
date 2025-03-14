import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';

export default function MensajeError({ open, onClose, errors }) {
  console.log(errors);

  const getErrorMessage = (error) => {
    if (typeof error === 'object') {
      return JSON.stringify(error);
    }
    return error;
  };

  const getValidaciones = (errors) => {
    if (!errors.warning && !errors.error) {
      return Object.values(errors).join(', ');
    }
    return null;
  };

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
        {getErrorMessage(errors.error) || getErrorMessage(errors.warning) || getValidaciones(errors) }
      </Alert>
    </Snackbar>
  );
}