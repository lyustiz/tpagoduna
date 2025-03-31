import { useState, memo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { formatDateTime } from "../../../utils/formatData";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const TicketItemList = memo(({ ticket }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const estados = {
    3: {
      color: "#2e7d32",
      label: "Disponible",
      active: true,
      code: "#2e7d32",
      textColor: "inherit",
    },
    4: {
      color: "warning",
      label: "Reservado",
      active: false,
      code: "#ed6c02",
      textColor: "inherit",
    },
    5: {
      color: "error",
      label: "Vendido",
      active: false,
      code: "#d32f2f",
      textColor: "#d32f2f",
    },
    0: {
      color: "info",
      label: "No disponible",
      active: false,
      code: "#d32f2f",
      textColor: "inherit",
    },
  };

  const estado = estados[ticket.id_estado] ?? estados[0];

  const handleClick = () => {
    handleOpen();
  };

  return (
    <>
      <Card
        color={estado.color}
        onClick={handleClick}
        sx={{
          fontSize: "1.20rem",
          fontWeight: "bold",
          color: "white",
          backgroundColor: estado.code,
          minWidth: 100,
          cursor: "zoom-in",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {ticket.nu_numero.toString().padStart(3, "0")}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.white" }}>
            {estado.label}
          </Typography>
        </CardContent>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            border: "0 white",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 8,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color={estado.color}
          >
            <ConfirmationNumberIcon  />
            { ' ' }
             Ticket {ticket.nu_numero.toString().padStart(3, "0")}
          </Typography>
          <div id="modal-modal-description" sx={{ mt: 2 }}>
            { ((estado.label == "Vendido" || estado.label == "Reservado") ) ? (
              <>
                <div>
                  {" "}
                  <b>Cliente:</b> {ticket.venta?.tx_nombre_cliente}
                </div>
                <div>
                  <b>Telefono:</b> {ticket.venta?.tx_celular_cliente}
                </div>
                <div>
                  <b>Fecha/Hora:</b> {formatDateTime(ticket.venta?.created_at)}
                </div>
                <div>
                  <b>Referencia:</b> {ticket.venta?.tx_referencia}
                </div>
              </>
            ) : (
              <div> <b>Estado:</b> {estado.label}</div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
});

export default TicketItemList;
