import React from "react";
import { Snackbar, Fade, Alert } from "@mui/material";

export default function TicketsSeleccionados({ open, ticketsSeleccionados, jugada }) {
  return (
    <Snackbar
      open={open}
      TransitionComponent={Fade}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity="info" variant="filled" sx={{ width: "100%" }}>
        Tickets ({ticketsSeleccionados.length}):  
        {' '}{ticketsSeleccionados.map((ticket) => ( (ticket.id.toString().padStart(3, "0") + " ") ))} 
        - Total: {ticketsSeleccionados.length * jugada.mo_valor_ticket}$ {ticketsSeleccionados.length * jugada.mo_valor_ticket * jugada.mo_valor_divisa}Bs.
      </Alert>
    </Snackbar>
  );
}
