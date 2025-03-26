import React from "react";
import { useState, useEffect } from "react"; // Import useEffect
import { router, useForm } from "@inertiajs/react";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import MensajeError from "@/Components/MensajeError";
import MensajeExito from "@/Components/MensajeExito";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import FormControl from "@mui/material/FormControl";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid2 from "@mui/material/Grid2";
import TextField from "@mui/material/TextField"; // Import TextField
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { formatDate, formatDateTime } from "../../utils/formatData";
import TicketItemList from "./Components/TicketItemList";
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

export default function Index({ jugadas, id_jugada, tickets }) {
  console.log(jugadas, id_jugada, tickets);
  const { data, errors, hasErrors, clearErrors } = useForm({
    numero: "",
    id_jugada: id_jugada,
  });

  const [estado, setEstado] = useState("");
  const [selectedJugada, setSelectedJugada] = useState("");
  const [numeroFilter, setNumeroFilter] = useState(""); // Nuevo estado para el filtro de número
  const [filteredTickets, setFilteredTickets] = useState(tickets.data); // Nuevo estado para los tickets filtrados

  useEffect(() => {
    // Este efecto se ejecuta cuando los tickets cambian
    if (numeroFilter === "") {
      // Si el filtro está vacío, muestra todos los tickets
      setFilteredTickets(tickets.data);
    } else {
      // Si hay un filtro, filtra los tickets
      const filtered = tickets.data.filter(
        (ticket) => String(ticket.nu_numero) === numeroFilter,
      );
      setFilteredTickets(filtered);
    }
  }, [tickets, numeroFilter]);

  const handlePage = (event, page) => {
    console.log("Page", page);
    setLoadin(true);
    router.get(
      route("ventas.index", {
        page: page,
        id_estado: idEstado,
        id_jugada: id_jugada,
      }),
    );
  };


  const handleJugada = (event) => {
    setLoadin(true);
    router.get(route("ticket.index", { id_jugada: event.target.value }));
  };

  const handleNumeroFilterChange = (event) => {
    setNumeroFilter(event.target.value);
  };

  const handleClickClear = () => {
    setNumeroFilter("");
  };

  const [loading, setLoadin] = useState(false);

  return (
    <>

      {/* Mostrar error */}
      <MensajeError
        open={hasErrors}
        onClose={() => clearErrors()}
        errors={errors}
      ></MensajeError>

      {/* Mostrar éxito */}

      <AuthenticatedLayout header="Tickets" title="Tickets">
        <Grid2 container gap={2}>
          <Grid2 size={6}>
            <FormControl fullWidth>
              <Select value={id_jugada} onChange={handleJugada} displayEmpty>
                {jugadas.map((jugada) => (
                  <MenuItem key={jugada.id} value={jugada.id}>
                    Jugada {jugada.id} - {formatDate(jugada.fe_fecha)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={5}>
          <TextField
              label="Filtrar por número"
              variant="outlined"
              value={numeroFilter}
              onChange={handleNumeroFilterChange}
              type="number"
              min="1"
              max="999"
              fullWidth
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end">
                    <IconButton
                      aria-label={
                         'Limpiar el FIltro' 
                      }
                      onClick={handleClickClear}
                      edge="end"
                    >
                     <ClearIcon /> 
                    </IconButton>
                  </InputAdornment>,
                },
              }}
            />
          </Grid2>

        </Grid2>
        <Grid2 container spacing={1} sx={{ marginTop: 2 }}>
          {" "}
          {filteredTickets.map((ticket) => (
            <Grid2 xs={6} sm={3} md={1.2} key={ticket.id}>
              {" "}
              <TicketItemList ticket={ticket} key={ticket.id} />
            </Grid2>
          ))}
        </Grid2>

        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </AuthenticatedLayout>
    </>
  );
}