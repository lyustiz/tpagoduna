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

export default function Index({ ventas, imgPath }) {
  console.log(ventas, imgPath);
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
    router.get(route("ventas.index", { page: page }));
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
        OnClose={ () =>setFormConfirm(false) }
        venta={ventaSel}
      ></FormConfirm>
      )}

      {/* Form cancel */}
      {formCancel && (
      <FormCancel
        open={formCancel}
        OnClose={ () =>setFormCancel(false) }
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
      <AuthenticatedLayout
        header={
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Ventas Juego 1
          </h2>
        }
      >
        <Head title="Venta" />

        {
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="simple table"
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Tickets</TableCell>
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
                      {venta.mo_total_tickets}
                    </TableCell>
                    <TableCell align="center">{venta.mo_total_venta}</TableCell>
                    <TableCell align="center">
                      {venta.tx_nombre_cliente}
                    </TableCell>
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
