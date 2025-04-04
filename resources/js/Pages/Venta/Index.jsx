import React from "react";
import { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid2 from "@mui/material/Grid2";
import { formatDate, formatDateTime } from "../../utils/formatData";
import MensajeExito from "@/Components/MensajeExito";
import MensajeError from "@/Components/MensajeError";
import UploadComprobante from "./Components/UploadComprobante";
import ImageZoom from "@/Pages/Venta/Components/ImageZoom";
import EstadoVenta from "@/Pages/Venta/Components/EstadoVenta";
import ActionButtons from "./Components/ActionButtons";
import FormConfirm from "./Components/FormConfirm";
import FormCancel from "./Components/FormCancel";
import FormDesconfirmar from "./Components/FormDesconfirmar";
import FormReactivar from "./Components/FormReactivar";

export default function Index({
  ventas,
  jugadas,
  imgPath,
  idEstado,
  id_jugada,
}) {
  const {
    data,
    errors,
    hasErrors,
    clearErrors,
  } = useForm({
    id: "",
    observaciones: "",
    referencia: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [formConfirm, setFormConfirm] = useState(false);
  const [formCancel, setFormCancel] = useState(false);
  const [formDesconfirmar, setFormDesconfirmar] = useState(false);
  const [formReactivar, setFormReactivar] = useState(false);
  const [ventaSel, setVentaSel] = useState(null);

  const [estado, setEstado] = useState(idEstado ?? "");
  const [selectedJugada, setSelectedJugada] = useState("");

  const handlePage = (event, page) => {
    console.log("Page", page);
    setLoadin(true);
    router.get(route("ventas.index", { page: page, id_estado: idEstado, id_jugada: id_jugada }));
  };

  const handleEstadoChange = (event) => {
    setEstado(event.target.value);
    setLoadin(true);
    router.get(route("ventas.index", { id_estado: event.target.value, id_jugada: id_jugada }));
  };

  const handleJugada = (event) => {
    router.get(route("ventas.index", { id_jugada: event.target.value }));
  };
  
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  /* ACCIONES FORMULARIO */
  const handleCancel = (venta) => {
    setVentaSel(venta);
    setFormCancel(true);
  };

  const handleConfirm = (venta) => {
    setVentaSel(venta);
    setFormConfirm(true);
  };

  const handleEdit = (venta) => {};
  
  const handleDesconfirmar = (venta) => {
    setVentaSel(venta);
    setFormDesconfirmar(true);
  };

  const handleReactivar = (venta) => {
    setVentaSel(venta);
    setFormReactivar(true);
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

      {/* Form Desconfirmar */}
      {formDesconfirmar && (
        <FormDesconfirmar
          open={formDesconfirmar}
          OnClose={() => setFormDesconfirmar(false)}
          venta={ventaSel}
        ></FormDesconfirmar>
      )}

      {/* Form Reactivar */}
      {formReactivar && (
        <FormReactivar
          open={formReactivar}
          OnClose={() => setFormReactivar(false)}
          venta={ventaSel}
        ></FormReactivar>
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

      <AuthenticatedLayout header="Ventas" title="Ventas">
        <Grid2 container gap={2}>
          <Grid2 size={6}>
            <FormControl fullWidth>
              <Select
                value={id_jugada}
                onChange={handleJugada}
                displayEmpty
              >
                {jugadas.map((jugada) => (
                  <MenuItem key={jugada.id} value={jugada.id}>
                    Jugada {jugada.id} - {formatDate(jugada.fe_fecha)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={5}>
            <FormControl>
              <ToggleButtonGroup
                size="small"
                value={idEstado}
                onChange={handleEstadoChange}
                sx={{ marginBottom: 2 }}
              >
                <ToggleButton
                  value={0}
                  color="primary"
                  selected={idEstado == 0}
                >
                  Todos
                </ToggleButton>

                <ToggleButton
                  value={4}
                  color="warning"
                  selected={idEstado == 4}
                >
                  Reservado
                </ToggleButton>

                <ToggleButton
                  value={5}
                  color="success"
                  selected={idEstado == 5}
                >
                  Vendido
                </ToggleButton>

                <ToggleButton value={6} color="error" selected={idEstado == 6}>
                  Cancelado
                </ToggleButton>
              </ToggleButtonGroup>
            </FormControl>
          </Grid2>
        </Grid2>
        {
          <TableContainer component={Paper} className="mt-1">
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
                      {formatDateTime(venta.created_at)}
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
                          venta={venta}
                        ></ImageZoom>
                      ) : (
                        <UploadComprobante venta={venta} text="Sin comprobante"></UploadComprobante>
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
                        onDesconfirmar={handleDesconfirmar}
                        onReactivar={handleReactivar}
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
