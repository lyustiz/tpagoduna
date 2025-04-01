import { useState, useCallback } from "react";
import { Head } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import Grid2 from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TicketItem from "./Components/TicketItem";
import TicketsSelected from "./Components/TicketsSelected";
import TikcetCounter from "./Components/TickeCounter";
import FormCompra from "./Components/FormCompra";
import WhatsappButton from "./Components/WhatsappButton";
import WhatsappButtonGroup from "./Components/WhatsappButtonGroup";
import MenuCompra from "./Components/MenuCompra";
import {formatDate} from "../../utils/formatData"

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

  if (!jugada) {
    return (
      <GuestLayout>
        <Head title="Jugada" />
        <Container fixed className="rounded-xl text-center p-8 mt-2 bg-white h-screen flex flex-col justify-start items-center">
          <div className="w-full">
            <h2 className="text-4xl text-red-400 font-extrabold">
              No hay Jugadas Activas
            </h2>
          </div>
          <div className="w-full">
            <h2 className="text-xl font-extrabold mt-4">
              Mantente atento a nuestras redes sociales...
            </h2>
          </div>
        </Container>
      </GuestLayout>
    );
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
            <h2 className="text-3xl text-red-400 font-extrabold">
              Lista de Tickets - Juego {jugada.id.toString().padStart(2, "0")} - Fecha {formatDate(jugada.fe_fecha)}
            </h2>

            <h2 className="text-xl font-extrabold mb-1">
            Y Recuerda: "<span className="text-red-500 underline">Tu número participa en 16 sorteos diferentes el mismo dia.</span>"
            </h2>

            <h2 className="text-xl text-red-400 font-extrabold">
              Valor Ticket {jugada.mo_valor_ticket}$ {" "}
              {jugada.mo_valor_ticket * jugada.mo_valor_divisa}Bs.
            </h2>

            <Grid2 container spacing={1} alignItems={"center"} justifyContent={"center"}>
              <Grid2>
                <WhatsappButtonGroup
                  codigoGrupo="HsrOip4gnJIIqfvjzTbGQf"
                  texto={'Solicito Informacion de '}
                  label={'Solicitar Informacion'}
                />
              </Grid2>
              <Grid2>
              <MenuCompra></MenuCompra>
              </Grid2>
            </Grid2> 
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