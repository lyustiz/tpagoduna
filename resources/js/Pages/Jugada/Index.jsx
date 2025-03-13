import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import React from "react";
import MensajeError from "@/Components/MensajeError";
import MensajeExito from "@/Components/MensajeExito";
import { Pagination, Typography } from "@mui/material";
import { FormControl } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import EstadoJugada from "@/Pages/Jugada/Components/EstadoJugada";
import AccionJugada from "@/Pages/Jugada/Components/AccionJugada";
import FormAccionesJugada from "@/Pages/Jugada/Components/FormAccionesJugada";
import Grid2 from "@mui/material/Grid2";

export default function Index({ jugadas }) {
  console.log(jugadas);
  const { errors, hasErrors, clearErrors } = useForm();

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoadin] = useState(false);
  const [frmAcciones, setFrmAcciones] = useState({
    open: false,
    accion: "",
    jugada: null,
  });

  const handlePage = (event, page) => {
    setLoadin(true);
    router.get(route("jugada.index", { page: page }));
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const handleAccionClose = () => {
    setFrmAcciones({ open: false, accion: "", jugada: null });
  };

  const handleAccionOpen = (accion, jugada) => {
    setFrmAcciones({ open: true, accion: accion, jugada: jugada });
  };

  return (
    <>
      {/* Mostrar error */}
      {hasErrors && (
        <MensajeError
          open={hasErrors}
          onClose={() => clearErrors()}
          errors={errors}
        ></MensajeError>
      )}
      {/* Mostrar éxito */}
      <MensajeExito
        open={showSuccess}
        onClose={handleCloseSuccess}
        mensaje={"Compra realizada con éxito."}
      ></MensajeExito>

      {/* Acciones */}
      <FormAccionesJugada
        open={frmAcciones.open}
        onClose={handleAccionClose}
        accion={frmAcciones.accion}
        jugada={frmAcciones.jugada}
      ></FormAccionesJugada>

      <AuthenticatedLayout header="JUGADAS" title="Jugadas">
        <Grid2 container spacing={2}>
          <Grid2>
            <FormControl>
              <ToggleButtonGroup size="small" sx={{ marginBottom: 2 }}>
                <ToggleButton value={0} color="primary" selected={false}>
                  Pendiente
                </ToggleButton>

                <ToggleButton value={5} color="success" selected={false}>
                  Activa
                </ToggleButton>

                <ToggleButton value={6} color="error" selected={false}>
                  Cerrado
                </ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
          </Grid2>
          <Grid2 alignItems="flex-start" >
            <Button size="small" variant="contained" color="success" href="/jugada/create" className="mt-2">
              Nuevo
            </Button>
          </Grid2>
        </Grid2>
        {
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <TableRow
                  sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
                >
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">Tickets</TableCell>
                  <TableCell align="center">Valor</TableCell>
                  <TableCell align="center">Tasa</TableCell>
                  <TableCell align="center">Min.Cierre</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {jugadas.data.map((jugada) => (
                  <TableRow
                    key={jugada.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{jugada.id}</TableCell>
                    <TableCell align="center">
                      {new Date(jugada.fe_fecha).toLocaleDateString("es-ES")}
                    </TableCell>
                    <TableCell align="center">{jugada.nu_tickets}</TableCell>
                    <TableCell align="center">
                      {jugada.mo_valor_ticket}$
                    </TableCell>
                    <TableCell align="center">
                      {jugada.mo_valor_divisa}Bs
                    </TableCell>
                    <TableCell align="center">
                      {jugada.nu_minutos_cierre}
                    </TableCell>
                    <TableCell align="center">
                      <EstadoJugada id_estado={jugada.id_estado} />{" "}
                    </TableCell>
                    <TableCell align="center">
                      <AccionJugada
                        jugada={jugada}
                        onActivar={() => handleAccionOpen("activar", jugada)}
                        onDesactivar={() =>
                          handleAccionOpen("desactivar", jugada)
                        }
                        onEdit={() =>
                          router.visit("/jugada/" + jugada.id + "/edit")
                        }
                        onCerrar={() => handleAccionOpen("cerrar", jugada)}
                      ></AccionJugada>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              count={jugadas.last_page}
              page={jugadas.current_page}
              onChange={handlePage}
            />
            <Typography variant="body2" className="p-2" gutterBottom>
              <strong>Total jugadas:</strong> {jugadas.total}
            </Typography>
          </TableContainer>
        }

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
