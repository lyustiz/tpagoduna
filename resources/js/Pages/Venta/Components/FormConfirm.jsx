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
import TextInput from "@/Components/TextInput";

const FormConfirm = ({ open, OnClose, venta }) => {
  
  const {
    data,
    setData,
    processing,
    errors,
    post,
    reset,
    hasErrors,
    clearErrors,
    setError,
  } = useForm({
    id: venta.id,
    referencia: "",
  });

  const [exito, setExito] = useState(false);
  const [msjExito, setMsjExito] = useState('');
  const [showForm, setShowForm] = useState(true);
  
  const handleConfirm = (e) => {
    e.preventDefault();
    if(data.referencia.length < 6){
      setError("warning", "Debe ingresar los ultimos 6 digitos");
      return
    }
    setShowForm(false);
    
    post(route("ventas.confirm", { id: data.id }), {
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
  }

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
          <DialogTitle>Confirmar Venta</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              ¿Estás seguro de que deseas Confirmar la venta?
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
            <Grid2 xs={8} md={4}>
              <div>
                <InputLabel htmlFor="refrencia" value="Nro. Refrencia" />
                <TextInput
                  id="refrencia"
                  type="number"
                  className="mt-1 mb-3 block w-full"
                  value={data.referencia}
                  onChange={(e) => setData("referencia", e.target.value)}
                  pattern="[0-9]+"
                  min="6" 
                  max="20"
                  required
                  placeholder="Ultimos 6 numeros"
                  title="Ultimos 6 numeros."
                />
                <InputError className="mt-2" message={errors.refrencia} />
              </div>
            </Grid2>
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

export default FormConfirm;
