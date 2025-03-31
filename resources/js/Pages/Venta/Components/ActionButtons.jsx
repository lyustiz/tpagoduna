import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ActionButtons({ onConfirm, onEdit, onCancel, venta }) {
  
  const isReservada = venta.id_estado == 4;
  const isVendida = venta.id_estado == 5;
  const isCancelada = venta.id_estado == 6;
  
  return (
   <>

    {isVendida && (
      <Typography variant="body2" className="p-2" gutterBottom>
      <strong>Ref:</strong> {venta.tx_referencia}
      </Typography>
    )}

    {isCancelada && (
      <Typography variant="body2" className="p-2" gutterBottom>
       {venta.tx_observaciones}
      </Typography>
    )}

    {isReservada && (

     <div className='d-flex justify-content-center'>
      <IconButton aria-label="confirm" color="success" onClick={() => onConfirm(venta)}>
        <CheckCircleIcon fontSize="small"   />
      </IconButton>
     
      <IconButton aria-label="cancel" color="error" onClick={() => onCancel(venta)}>
        <CancelIcon fontSize="small" />
      </IconButton>
      
      </div>
  )}
       
    </>
  );
}