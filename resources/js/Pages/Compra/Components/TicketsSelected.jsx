import { useState } from "react";
import { Chip } from "@mui/material";

export default function TicketsSelected({
  tickets,
  onRemoveTicket,
}) {
  const handledRemove = (ticket) => {
     onRemoveTicket(ticket);
  };

  return (
    <>
      {tickets.map((ticket) => (
        <Chip
          key={ticket.id}
          color="primary"
          label={ticket.nu_numero.toString().padStart(3, "0")}
          clickable
          onDelete={() => handledRemove(ticket)}
        ></Chip>
      ))}
    </>
  );
}
