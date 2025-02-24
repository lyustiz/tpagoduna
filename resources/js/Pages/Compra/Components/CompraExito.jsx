import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Alert,
  Grid2,
  Typography,
} from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WhatsappButton from "./WhatsappButton";
const CompraExito = ({ open, onClose, tickets, jugada }) => {
  var cantidad = tickets.length;
  var total =  cantidad * jugada.mo_valor_ticket;
  var totalBolivares =  cantidad * jugada.mo_valor_ticket * jugada.mo_valor_divisa;
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <Alert icon={false} everity="success">
          <DialogTitle>
            {" "}
            <TaskAltIcon></TaskAltIcon> Compra Realizada Con Exito!!
          </DialogTitle>
          <DialogContent>
            <Grid2 container spacing={1}>
              <Grid2 item size={12}>
                <Typography variant="subtitle1">
                  Nro de Jugada: <b>001</b>{" "}
                </Typography>
              </Grid2>
              <Grid2 item size={12}>
                <Typography variant="subtitle1">
                  Cantidad de Tickets: <b>{cantidad}</b>
                </Typography>
              </Grid2>
              <Grid2 item size={12}>
                <Typography variant="subtitle1">
                  Monto de Venta: <b>{total}$</b> / <b>{totalBolivares}Bs.</b>
                </Typography>
              </Grid2>
              <Grid2>
                <WhatsappButton
                  celular="+584129396107"
                  texto={"Informacion venta 001"}
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
