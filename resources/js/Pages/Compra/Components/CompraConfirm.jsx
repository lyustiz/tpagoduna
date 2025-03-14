import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

const CompraConfirm = ({
  open,
  onConfirm,
  onCancel,
  data,
  tickets,
  jugada,
}) => {
  var cantidad = tickets.length;
  var total = cantidad * jugada.mo_valor_ticket;
  var totalBolivares =
    cantidad * jugada.mo_valor_ticket * jugada.mo_valor_divisa;
  return (
    <>
      <Dialog open={open} onClose={onCancel}>
        <DialogTitle>Confirmar Compra?</DialogTitle>
        <DialogContent>
          <Grid2 gap={2} container>
            <Grid2 size={12} xs={12}>
              Revise los datos cuidadosamente antes de dar click al boton
              comprar:
            </Grid2>

            <Grid2 size={4} xs={12}>
              {" "}
              <Typography variant="subtitle1">Nombre:</Typography>{" "}
            </Grid2>
            <Grid2 size={6} xs={12}>
              {data.nombre}
            </Grid2>

            <Grid2 size={4} xs={12}>
              <Typography variant="subtitle1">Celular:</Typography>
            </Grid2>
            <Grid2 size={6} xs={12}>
              {data.celular}
            </Grid2>

            <Grid2 size={4} xs={12}>
              <Typography variant="subtitle1">Tickets:</Typography>
            </Grid2>
            <Grid2 size={6} xs={12}>
              {tickets.join(", ")}
            </Grid2>
            <Grid2 size={12} xs={12}>
              Cant. Tickets: <b>{cantidad}</b> {" - "} Total Compra:{" "}
              <b>
                {total}$ / {totalBolivares}Bs.
              </b>{" "}
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onCancel} color="warning">
            Cancelar
          </Button>
          <Button variant="contained" onClick={onConfirm} color="success">
            Comprar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CompraConfirm;
