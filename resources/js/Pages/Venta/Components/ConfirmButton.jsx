import React, { useState } from 'react';
import { IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ConfirmButton = ({ venta }) => {
  const [open, setOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClickOpen = () => {
    console.log(venta);
    setError(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/confirmar-venta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ventaId: venta.id }),
      });

      if (!response.ok) {
        throw new Error('Error al confirmar la venta');
      }

      const result = await response.json();
      console.log(result);
      setShowConfirmation(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <CheckCircleIcon fontSize="small" color="success" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmar Venta</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            ¿Estás seguro de que deseas Confirmar esta venta?
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Cliente:</strong> {venta.tx_nombre_cliente}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Tickets:</strong> {venta.mo_total_tickets}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Monto:</strong> {venta.mo_total_venta}$
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>Cancelar</Button>
          <Button onClick={handleConfirm} autoFocus disabled={loading}>
            {loading ? 'Confirmando...' : 'Sí'}
          </Button>
        </DialogActions>
      </Dialog>
      {showConfirmation && (
        <Typography variant="body2" color="success">
          Acción confirmada. Puedes mostrar aquí un mensaje o realizar otra acción.
        </Typography>
      )}
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </>
  );
};

export default ConfirmButton;