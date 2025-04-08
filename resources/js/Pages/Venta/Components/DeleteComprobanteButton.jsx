import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { router, useForm } from "@inertiajs/react";
import { styled } from "@mui/material/styles";

const DeleteButtonStyled = styled(IconButton)({
  position: "absolute",
  top: "10px",
  right: "10px",
  zIndex: 10,
  color: "red",
});

export default function DeleteComprobanteButton({ onClose, venta }) {

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

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleDelete = () => {

     post(route("ventas.eliminarcomprobante", { id: data.id }), {
           onSuccess: (response) => {
            handleConfirmClose();
            alert("Comprobante eliminado con éxito"); 
            router.reload({ only: ["ventas"] });
              
           },
           onError: (e) => {
            alert("Error: " + e.error || "No se pudo eliminar el comprobante.");
            handleConfirmClose();
           }
         });
  };

  return (
    <>


      <DeleteButtonStyled aria-label="delete" onClick={handleConfirmOpen}>
        <DeleteIcon />
      </DeleteButtonStyled>

      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Estás seguro de que quieres eliminar este comprobante?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}