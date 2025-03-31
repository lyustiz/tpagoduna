import React from 'react';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

export default function AccionJugada({ onEdit, onDesactivar,  onActivar, onCerrar, jugada }) {
  
  const isActiva = jugada.id_estado == 1;
  const isInactiva = jugada.id_estado == 2;
  const isCerrada = jugada.id_estado == 7;


  return (
   <>
    <div className='d-flex justify-content-center'>
      {!isCerrada && (
      <IconButton aria-label="editar" color="warning" onClick={() => onEdit(jugada)}>
        <EditIcon fontSize="small"   />
      </IconButton>
      )} 
      {isActiva && (
      <IconButton aria-label="desactivar" color="success" onClick={() => onDesactivar(jugada)}>
        <ToggleOnIcon />
      </IconButton>
      )}  
      {(isInactiva || isCerrada) && (
        <IconButton aria-label="activar" color="" onClick={() => onActivar(jugada)}>
          <ToggleOffIcon />
        </IconButton>
      )}
      {isActiva && (
      <IconButton aria-label="Cerrar" color="error" onClick={() => onCerrar(jugada)}>
        <CancelIcon fontSize="small" />
      </IconButton>
      )} 
    </div>
    </>
  );
}