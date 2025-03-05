import { useState, useCallback } from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Grid2, Container, Paper } from "@mui/material";
import TicketItem from "./Components/TicketItem";
import TicketsSelected from "./Components/TicketsSelected";
import TikcetCounter from "./Components/TickeCounter";
import FormCompra from "./Components/FormCompra";
import WhatsappButton from "./Components/WhatsappButton";

export default function Index({ jugada }) {
  const [ticketsSel, setTickets] = useState([]);

  const HandleAddTicket = useCallback((ticket) => {
    setTickets((prevTickets) => [...prevTickets, ticket]);
  }, []);

  const HandleRemoveTicket = useCallback((ticket) => {
    setTickets((prevTickets) => prevTickets.filter((t) => t.id !== ticket.id));
  }, []);

  function HandleFinVenta() {
    setTickets([]);
  }

  return (
    <>
      <GuestLayout>
        <Head title="Jugada" />

        <Paper
          elevation={12}
          className="w-89 xs:mx-4 sm:mx-8 md:mx-16  px-4 py-8 mt-2 mb-2"
          color="white"
          sx={{
          
            borderRadius: 8,
          
          }}
          square={false}
        >
          <Container fixed className="text-center p-8">
            <h2 className="text-2xl text-amber-400 font-extrabold">
              Lista de Tickets - Juego {jugada.id.toString().padStart(2, "0")}
            </h2>

            <h2 className="text-xl text-red-400 font-extrabold">
              Valor Ticket ${jugada.mo_valor_ticket} Bs.{" "}
              {jugada.mo_valor_ticket * jugada.mo_valor_divisa}
            </h2>

            <WhatsappButton
                            celular="+584129396107"
                            texto={'Solicito Informacion de '}
                            label={'Solicitar Informacion'}
                          />
          </Container>

          <Container
            fixed
            className="mx-auto max-y-95 max-h-64 overflow-y-scroll mt-6 bg-gray-50"
          >
            <Grid2 container spacing={1}>
              {jugada.tickets.map((ticket) => (
                <TicketItem
                  ticketsSel={ticketsSel}
                  ticket={ticket}
                  onAddTicket={HandleAddTicket}
                  onRemoveTicket={HandleRemoveTicket}
                  key={ticket.id}
                />
              ))}
            </Grid2>
          </Container>

          <Container fixed className="mt-8 mb-2">
            <Grid2
              container
              spacing={1}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TikcetCounter
                cantidad={ticketsSel.length}
                jugada={jugada}
              ></TikcetCounter>
            </Grid2>
          </Container>

          <Container fixed className="mt-2 mb-2">
            <Grid2
              container
              spacing={1}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TicketsSelected
                tickets={ticketsSel}
                onRemoveTicket={HandleRemoveTicket}
              ></TicketsSelected>
            </Grid2>
          </Container>

          <Container fixed>
            <FormCompra jugada={jugada} ticketsSel={ticketsSel} onFinVenta={HandleFinVenta}> </FormCompra>
          </Container>
        </Paper>
      </GuestLayout>
    </>
  );
}
