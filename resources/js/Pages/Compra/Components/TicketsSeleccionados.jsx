import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";

export default function TicketsSeleccionados({ open, ticketsSeleccionados, jugada }) {
  return (
    <Snackbar
      open={open}
      TransitionComponent={Fade}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity="info" variant="filled" sx={{ width: "100%" }}>
        Tickets ({ticketsSeleccionados.length}):  
        {' '}{ticketsSeleccionados.map((ticket) => ( (ticket.nu_numero.toString().padStart(3, "0") + " ") ))} 
        - Total: {ticketsSeleccionados.length * jugada.mo_valor_ticket}$ {ticketsSeleccionados.length * jugada.mo_valor_ticket * jugada.mo_valor_divisa}Bs.
      </Alert>
    </Snackbar>
  );
}
