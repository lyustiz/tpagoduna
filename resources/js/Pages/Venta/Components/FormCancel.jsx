import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


import MensajeError from "@/Components/MensajeError";
import MensajeExito from "@/Components/MensajeExito";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

const FormCancel = ({ open, OnClose, venta }) => {
  const {
    data,
    setData,
    processing,
    errors,
    post,
    reset,
    hasErrors,
    clearErrors,
  } = useForm({
    id: venta.id,
    observaciones: "No pago",
  });

  const [exito, setExito] = useState(false);
  const [msjExito, setMsjExito] = useState("");
  const [showForm, setShowForm] = useState(true);

  const handleConfirm = (e) => {
    e.preventDefault();
    setShowForm(false);
    post(route("ventas.cancel", { id: data.id }), {
      _method: "put",
      onSuccess: (response) => {
        setMsjExito(response.props.success);
        setExito(true);
        router.reload({ only: ["ventas"] });
      },
      onFinish: () => {
        reset();
        setTimeout(() => {
          OnClose(true);
        }, 1000);
      },
    });
  };

  const handdleClose = (valido) => {
    reset();
    OnClose(valido);
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
        open={exito}
        onClose={() => setExito(false)}
        mensaje={msjExito}
      ></MensajeExito>

      {showForm && (
        <Dialog open={open} onClose={() => handdleClose(false)}>
          <form action="" method="post">
            <DialogTitle sx={{ color: "red" }}>Cancelar Venta</DialogTitle>
            <DialogContent>
              <Typography variant="body1" gutterBottom>
                ¿Estás seguro de que deseas Cancelar la venta?
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Cliente:</strong> {venta?.tx_nombre_cliente}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Tickets:</strong> {venta?.mo_total_tickets}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Monto:</strong> {venta?.mo_total_venta}$
              </Typography>
              
              <Grid2 item xs={8} md={4}>
                <div>
                  <InputLabel htmlFor="observaciones" value="Motivo Cancelacion" />
                  <select
                    id="observaciones"
                    className="mt-1 mb-3 block w-full"
                    value={data.observaciones}
                    onChange={(e) => setData("observaciones", e.target.value)}
                    required
                  >
                    <option value="No pago">No pago</option>
                    <option value="No envio Comp/Ref">No envio Comprobante o numero de referencia</option>
                    <option value="No respondio">No respondio</option>
                    <option value="Otras">Otras</option>
                  </select>
                  <InputError className="mt-2" message={errors.observaciones} />
                </div>
              </Grid2>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handdleClose(false)} disabled={processing}>
                Cancelar
              </Button>
              <Button onClick={handleConfirm} autoFocus disabled={processing}>
                {processing ? "Cancelando..." : "Sí"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.modal + 1 })}
        open={processing}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default FormCancel;
