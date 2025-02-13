import { useState } from "react";
import { Chip, Tooltip } from "@mui/material";

export default function TicketItem({ ticket, onAddTicket, onRemoveTicket, ticketsSel }) {
  const [isSelected, setIsSelected] = useState(false);

  const estados = {
    3: { color: "#2e7d32", label: "Disponible", active: true , "code" : '#2e7d32'},
    4: { color: "warning", label: "Reservado", active: false, "code" : '#ed6c02' },
    5: { color: "error", label: "Vendido", active: false, "code" : '#d32f2f' },
  };

  const estado = estados[ticket.id_estado];

  const handledAddRemove = (isSelected) => {
    setIsSelected(!isSelected);
    !isSelected ? onAddTicket(ticket) : onRemoveTicket(ticket);
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
          color={isSelected ? "primary" : estado.color}
          label={ticket.nu_numero.toString().padStart(3, "0")}
          clickable={estado.active}
          onClick={
            estado.active
              ? () => {
                  handledAddRemove(isSelected);
                }
              : null
          }
          message={isSelected ? "active" : "inactive"}
        ></Chip>
      </Tooltip>
    </>
  );
}
