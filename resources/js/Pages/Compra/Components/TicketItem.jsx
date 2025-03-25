import { useState, memo } from "react";
import  Chip from "@mui/material/Chip";
import  Tooltip from "@mui/material/Tooltip";

const TicketItem = memo(({ ticketsSel, ticket, onAddTicket, onRemoveTicket }) => {
  const isSelected = ticketsSel.some((t) => t.nu_numero === ticket.nu_numero);

  const estados = {
    3: { color: "#2e7d32", label: "Disponible", active: true , "code" : '#2e7d32', textColor: 'inherit' },
    4: { color: "warning", label: "Reservado", active: false, "code" : '#ed6c02', textColor: 'inherit' },
    5: { color: "error", label: "Vendido", active: false, "code" : '#d32f2f', textColor: '#d32f2f' },
    0: { color: "info", label: "No disponible", active: false, "code" : '#d32f2f', textColor: 'inherit' },
  };

  const estado = estados[ticket.id_estado] ?? estados[0]; ;

  const handleClick = () => {
    if (isSelected) {
      onRemoveTicket(ticket);
    } else {
      onAddTicket(ticket);
    }
  };


  // si no esta en los seleccionado desactivar
  const miTicket = ticketsSel.find((t) => t.id === ticket.id)
  if(miTicket == undefined && isSelected)
  {
    setIsSelected(false); 
  }
  
  return (
    <>
      <Tooltip
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: isSelected ? "#1976d2" :   estado.code,
            },
          },
        }}
        title={isSelected ? "Seleccionado" : estado.label}
      >
        <Chip
          size="medium"
          color={isSelected ? "primary" : estado.color}
          label={ticket.nu_numero.toString().padStart(3, "0")}
          clickable={estado.active}
          onClick={estado.active ? handleClick : null}
          message={isSelected ? "active" : "inactive"}
          sx={{ fontSize: '1.20rem', fontWeight: 'bold', color: estado.textColor }}
        ></Chip>
      </Tooltip>
    </>
  );
});


export default TicketItem;