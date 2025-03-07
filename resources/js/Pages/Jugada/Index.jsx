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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function Index({ jugadas }) {

  console.log(jugadas);
  const {
    data,
    setData,
    processing,
    errors,
    post,
    reset,
    recentlySuccessful,
    hasErrors,
    transform,
    clearErrors,
  } = useForm({
    id: "",
    observaciones: "",
    referencia: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [formConfirm, setFormConfirm] = useState(false);
  const [formCancel, setFormCancel] = useState(false);
  const [ventaSel, setVentaSel] = useState(null);
  const [loading, setLoadin] = useState(false);
/*
  const handleCancel = (venta, oservaciones) => {
    setVentaSel(venta);
    setFormCancel(true);
  };

  const handleConfirm = (venta) => {
    setVentaSel(venta);
    setFormConfirm(true);
  };

  const handleEdit = (venta) => {
    console.log("Edit", venta);
    setLoadin(true);
    setTimeout(() => {
      setLoadin(false);
    }, 1000);
  };
*/
  const handlePage = (event, page) => {
    console.log("Page", page);
    setLoadin(true);
    router.get(route("jugada.index", { page: page }));
  };
/*
  const handleEstadoChange = (event) => {
    setEstado(event.target.value);
    setLoadin(true);
    router.get(route("ventas.index", { id_estado: event.target.value }));
  };

  

  const [loading, setLoadin] = useState(false);*/
const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <>
      
      {/* Mostrar error */}
      <MensajeError
        open={hasErrors}
        onClose={() => clearErrors()}
        errors={errors}
      ></MensajeError>

      {/* Mostrar éxito */}
      <MensajeExito
        open={showSuccess}
        onClose={handleCloseSuccess}
        mensaje={"Compra realizada con éxito."}
      ></MensajeExito>
      <AuthenticatedLayout
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            JUGADAS
          </h2>
        }
      >
        <Head title="Jugadas" />
        <FormControl fullWidth>
          <ToggleButtonGroup
            size="small"
            sx={{ marginBottom: 2 }}
          >
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

        
          { <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              size="small"
            >
  {

    /*
id
fe_fecha
nu_tickets
mo_valor_ticket
mo_valor_divisa
id_estado
tx_observaciones
id_usuario
created_at
updated_at


    */
  }



             <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Fecha</TableCell>
                  <TableCell align="center">Tickets</TableCell>
                  <TableCell align="center">Valor</TableCell>
                  <TableCell align="center">Valor Divisa</TableCell>
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
                    <TableCell align="center">{new Date(jugada.fe_fecha).toLocaleDateString("es-ES")}</TableCell>
                    <TableCell align="center">{jugada.nu_tickets}</TableCell>
                    <TableCell align="center">{jugada.mo_valor_ticket}$</TableCell>
                    <TableCell align="center">{jugada.mo_valor_divisa}Bs</TableCell>
                    <TableCell align="center">{jugada.estado.tx_nombre}</TableCell>
                    <TableCell align="center">
                     Acciones
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
