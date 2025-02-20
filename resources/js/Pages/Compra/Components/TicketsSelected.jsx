import { useCallback } from "react";
import { Chip } from "@mui/material";
import React from "react";

const MemoizedChip = React.memo(({ ticket, onDelete }) => (
  <Chip
    key={ticket.id}
    color="primary"
    label={ticket.nu_numero.toString().padStart(3, "0")}
    clickable
    onDelete={onDelete}
    sx={{ fontSize: '1.20rem', fontWeight: 'bold' }}
  />
));

export default function TicketsSelected({
  tickets,
  onRemoveTicket,
}) {
  const handledRemove = useCallback((ticket) => {
    onRemoveTicket(ticket);
  }, [onRemoveTicket]);

  return (
    <>
      {tickets.map((ticket) => (
        <MemoizedChip
          key={ticket.id}
          ticket={ticket}
          onDelete={() => handledRemove(ticket)}
        />
      ))}
    </>
  );
}