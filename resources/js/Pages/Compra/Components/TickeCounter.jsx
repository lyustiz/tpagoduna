import { useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

export default function TicketCounter({ cantidad, jugada }) {
  
  var  total =  cantidad * jugada.mo_valor_ticket;
  var  totalBolivares =  cantidad * jugada.mo_valor_ticket * jugada.mo_valor_divisa;
  
  return (
    <>
      <Card elevation={3} sx={{ borderRadius: 6 }}>
      <CardContent className="text-center">
        <h2 className="font-bold">
        Ticket Seleccionados:  {cantidad}
        </h2>
        <p>
           Total: $ {total}  Bs.{totalBolivares}
        </p>
      </CardContent>
      </Card>
    </>
  );
}
