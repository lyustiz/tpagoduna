import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WhatsappButton from "./WhatsappButton";
const CompraExito = ({ open, onClose, tickets, jugada, venta }) => {
  let cantidad = tickets.length;
  let total = cantidad * jugada.mo_valor_ticket;
  let totalBolivares =
    cantidad * jugada.mo_valor_ticket * jugada.mo_valor_divisa;

  var ticketsList = tickets.map((numero) => {
    return String(numero).padStart(3, "0") + " ";
  });

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Alert icon={false} everity="success">
          <DialogTitle>
            <TaskAltIcon></TaskAltIcon> Compra Realizada Con Exito!!
          </DialogTitle>
          <DialogContent>
            <Grid2 container spacing={1}>
              <Grid2 size={12}>
                <Typography variant="subtitle1">
                  Nro de Jugada: <b>{jugada.id}</b>
                </Typography>
              </Grid2>
              <Grid2 size={12}>
                <Typography variant="subtitle1">
                  Tickets: {ticketsList}(<b>{cantidad}</b>)
                </Typography>
              </Grid2>
              <Grid2 size={12}>
                <Typography variant="subtitle1">
                  Monto de Venta: <b>{total}$</b> / <b>{totalBolivares}Bs.</b>
                </Typography>
              </Grid2>
              <Alert severity="info">
                <Typography variant="body">
                  {venta.whatsapp ? (
                    <b>
                      Su compra esta en proceso de validación, debe enviar el
                      comprobante mediante Whatsapp:{" "}
                    </b>
                  ) : (
                    <b>
                      Su compra esta en proceso de validación, si tiene alguna
                      pregunta puedes contactarnos por:{" "}
                    </b>
                  )}
                </Typography>
              </Alert>
              <Grid2>
                <WhatsappButton
                  celular="+584129396107"
                  texto={
                    "Informacion tickets; " +
                    ticketsList +
                    "(" +
                    cantidad +
                    ") Jugada " +
                    jugada.id
                  }
                />
              </Grid2>
            </Grid2>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={onClose} color="success">
              OK
            </Button>
          </DialogActions>
        </Alert>
      </Dialog>
    </>
  );
};

export default CompraExito;
