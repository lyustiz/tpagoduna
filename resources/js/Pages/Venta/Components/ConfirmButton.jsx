import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";

import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Grid2";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MensajeError from "@/Components/MensajeError";
import MensajeExito from "@/Components/MensajeExito";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";

const ConfirmButton = ({ venta }) => {
  const {
    data,
    setData,
    processing,
    errors,
    post,
    hasErrors,
    clearErrors,
  } = useForm({
    id: venta.id,
    referencia: "",
  });

  const [open, setOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    post(route("ventas.confirm", { id: data.id }), {
      _method: "put",
      onSuccess: () => {
        console.log("Venta confirmada");
        setShowConfirmation(true);
        router.reload({ only: ["ventas"] });
      },
      onFinish: () => {
        setOpen(false);
      },
    });
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
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        mensaje={"Compra realizada con éxito."}
      ></MensajeExito>

      <form action="" method="post">
        <IconButton onClick={handleClickOpen}>
          <CheckCircleIcon fontSize="small" color="success" />
        </IconButton>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Confirmar Venta</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              ¿Estás seguro de que deseas Confirmar esta venta?
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Cliente:</strong> {venta.tx_nombre_cliente}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Tickets:</strong> {venta.mo_total_tickets}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Monto:</strong> {venta.mo_total_venta}$
            </Typography>
            <Grid2 item xs={8} md={4}>
              <div>
                <InputLabel htmlFor="refrencia" value="Nro. Refrencia" />

                <TextInput
                  id="refrencia"
                  type="number"
                  className="mt-1 mb-3 block w-full"
                  value={data.referencia}
                  onChange={(e) => setData("refrencia", e.target.value)}
                  autoComplete="refrencia"
                  pattern="[0-9]+"
                  required
                  title="Solo numeros, Este campo es obligatorio."
                />

                <InputError className="mt-2" message={errors.telefono} />
              </div>
            </Grid2>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={processing}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm} autoFocus disabled={processing}>
              {processing ? "Confirmando..." : "Sí"}
            </Button>
          </DialogActions>
        </Dialog>
      </form>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={processing}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ConfirmButton;
