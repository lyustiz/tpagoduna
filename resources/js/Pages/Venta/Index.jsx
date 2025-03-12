import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EstadoVenta from "@/Pages/Venta/Components/EstadoVenta";
import ImageZoom from "@/Pages/Venta/Components/ImageZoom";
import UploadComprobante from "./Components/UploadComprobante";
import ActionButtons from "./Components/ActionButtons";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import React from "react";
import MensajeError from "@/Components/MensajeError";
import MensajeExito from "@/Components/MensajeExito";
import { Pagination, Typography } from "@mui/material";
import FormConfirm from "./Components/FormConfirm";
import FormCancel from "./Components/FormCancel";
import { FormControl } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function Index({ ventas, imgPath, idEstado }) {
  console.log(ventas, imgPath, idEstado);
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
  const [estado, setEstado] = useState(idEstado ?? "");

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

  const handlePage = (event, page) => {
    console.log("Page", page);
    setLoadin(true);
    router.get(route("ventas.index", { page: page, id_estado: idEstado }));
  };

  const handleEstadoChange = (event) => {
    setEstado(event.target.value);
    setLoadin(true);
    router.get(route("ventas.index", { id_estado: event.target.value }));
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  const [loading, setLoadin] = useState(false);
  return (
    <>
      {/* Form confirm */}
      {formConfirm && (
        <FormConfirm
          open={formConfirm}
          OnClose={() => setFormConfirm(false)}
          venta={ventaSel}
        ></FormConfirm>
      )}

      {/* Form cancel */}
      {formCancel && (
        <FormCancel
          open={formCancel}
          OnClose={() => setFormCancel(false)}
          venta={ventaSel}
        ></FormCancel>
      )}

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
      
      <AuthenticatedLayout header="Ventas" title="Ventas"
      >
        <FormControl fullWidth>
          <ToggleButtonGroup
            size="small"
            value={idEstado}
            onChange={handleEstadoChange}
            sx={{ marginBottom: 2 }}
          >
            <ToggleButton value={0} color="primary" selected={idEstado == 0}>
              Todos
            </ToggleButton>

            <ToggleButton value={4} color="warning" selected={idEstado == 4}>
              Reservado
            </ToggleButton>

            <ToggleButton value={5} color="success" selected={idEstado == 5}>
              Vendido
            </ToggleButton>

            <ToggleButton value={6} color="error" selected={idEstado == 6}>
              Cancelado
            </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>

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
                  <TableCell align="center">Tickets</TableCell>
                  <TableCell align="center">Fecha/Hora</TableCell>
                  <TableCell align="center">Monto</TableCell>
                  <TableCell align="center">Cliente</TableCell>
                  <TableCell align="center">Telefono</TableCell>
                  <TableCell align="center">Comprobante</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ventas.data.map((venta) => (
                  <TableRow
                    key={venta.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{venta.id}</TableCell>
                    <TableCell align="center">
                      {venta.venta_tickets.map((ticket) => (
                        <span key={ticket.id}>
                          {ticket.nu_ticket.toString().padStart(3, "0")}{" "}
                        </span>
                      ))}{" "}
                      ({venta.mo_total_tickets})
                    </TableCell>
                    <TableCell align="center">
                      {new Date(venta.created_at).toLocaleString("es-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TableCell>
                    <TableCell align="center">
                      {venta.mo_total_venta}$
                    </TableCell>
                    <TableCell>{venta.tx_nombre_cliente}</TableCell>
                    <TableCell align="center">
                      {venta.tx_celular_cliente}
                    </TableCell>
                    <TableCell align="center">
                      {venta.tx_comprobante != null &&
                      venta.tx_comprobante != "" ? (
                        <ImageZoom
                          src={imgPath + venta.tx_comprobante}
                          alt="Comprobante"
                        ></ImageZoom>
                      ) : (
                        <UploadComprobante text="Sin comprobante"></UploadComprobante>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <EstadoVenta id_estado={venta.id_estado} />
                    </TableCell>

                    <TableCell align="center">
                      <ActionButtons
                        onCancel={handleCancel}
                        onConfirm={handleConfirm}
                        onEdit={handleEdit}
                        venta={venta}
                      ></ActionButtons>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              count={ventas.last_page}
              page={ventas.current_page}
              onChange={handlePage}
            />
            <Typography variant="body2" className="p-2" gutterBottom>
              <strong>Total ventas:</strong> {ventas.total}
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
