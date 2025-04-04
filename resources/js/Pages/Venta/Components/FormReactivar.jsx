import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import MensajeError from "@/Components/MensajeError";
import MensajeExito from "@/Components/MensajeExito";


const FormReactivar = ({ open, OnClose, venta }) => {
  
  const {
    data,
    processing,
    errors,
    post,
    reset,
    hasErrors,
    clearErrors,
  } = useForm({
    id: venta.id,
  });

  const [exito, setExito] = useState(false);
  const [msjExito, setMsjExito] = useState('');
  const [showForm, setShowForm] = useState(true);
  
  const handleConfirm = (e) => {
    e.preventDefault();
    setShowForm(false);
    
    post(route("ventas.reactivar", { id: data.id }), {
      onSuccess: (response) => {
        setMsjExito(response.props.success);
        setExito(true);
        router.reload({ only: ["ventas"] });
      },
    });
  };

  const handdleClose = (valido) => {
    OnClose(valido);
  }

  return (
    <>
      {/* Mostrar error */}
      <MensajeError
        open={hasErrors}
        onClose={() =>  handdleClose(false)}
        errors={errors}
      ></MensajeError>

      {/* Mostrar éxito */}
      <MensajeExito
        open={exito}
        onClose={() =>  handdleClose(true)}
        mensaje={msjExito}
      ></MensajeExito>

      {showForm && (
      <Dialog open={open} onClose={() => handdleClose(false)}>
        <form action="" method="post">
          <DialogTitle>Reactivar Venta</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              ¿Estás seguro de que deseas Reactivar la venta?
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
           
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handdleClose(false)} disabled={processing}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} autoFocus disabled={processing}>
              {processing ? "Confirmando..." : "Sí"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      )}

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.modal+1 })}
        open={processing}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default FormReactivar;