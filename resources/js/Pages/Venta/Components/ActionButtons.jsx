import React from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import NextPlanIcon from '@mui/icons-material/NextPlan';

export default function ActionButtons({ onConfirm, onEdit, onCancel, onDesconfirmar, onReactivar, venta }) {
  
  const isReservada = venta.id_estado == 4;
  const isVendida = venta.id_estado == 5;
  const isCancelada = venta.id_estado == 6;
  
  return (
   <>

    {isVendida && (
      <>
      <Typography variant="body2" className="m-0" gutterBottom>
      <strong>Ref:</strong> {venta.tx_referencia}
      </Typography>
      <IconButton aria-label="deconfirmar" color="warning" onClick={() => onDesconfirmar(venta)}>
        <ReplayCircleFilledIcon fontSize="small"   />
      </IconButton>
      </>
    )}

    {isCancelada && (
      <>
      <Typography variant="body2" className="p-0" gutterBottom>
       {venta.tx_observaciones}
      </Typography>
      <IconButton aria-label="reactivar" color="info" onClick={() => onReactivar(venta)}>
        <NextPlanIcon fontSize="small"   />
      </IconButton>
      </>
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