import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import MensajeError from "@/Components/MensajeError";
import MensajeExito from "@/Components/MensajeExito";

const FormAccionesJugada = ({ open, onClose, accion, jugada }) => {

  const {
    processing,
    errors,
    post,
    reset,
    hasErrors,
    clearErrors,
  } = useForm();

  const [exito, setExito] = useState(false);
  const [msjExito, setMsjExito] = useState('');
  
  const handleConfirm = (e) => {
    e.preventDefault();
    if(!accion)
    {
      return;
    }

    post(route("jugada."+accion, { id: jugada.id }), {
      _method: "put",
      onSuccess: (response) => {
        setMsjExito(response.props.success);
        setExito(true);
        router.reload();
      },
      onFinish: () => {
        onClose();
      },
    });
  };

  const getMensajes = (accion) => {
    switch (accion) {
        case 'activar':
            return {title: 'Activar Jugada', text: '¿Estás seguro de que deseas Activar la Jugada?'};
        case 'desactivar':
            return {title: 'Desactivar Jugada', text: '¿Estás seguro de que deseas Desactivar la Jugada?'};
        case 'cerrar':
            return {title: 'Cerrar Jugada', text: '¿Estás seguro de que deseas Cerrar la Jugada?'};
        default:
            return {title: '', text: ''};
    }
  }

  const mensajes = getMensajes(accion);

  const handdleClose = (valido) => {
    reset();
    onClose(valido);
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


      <Dialog open={open} onClose={() => handdleClose(false)}>
        <form action="" method="post">
          <DialogTitle>{mensajes.title}</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
                {mensajes.text}
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
      

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.modal+1 })}
        open={processing}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default FormAccionesJugada;
