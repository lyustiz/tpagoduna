import React, { useState, useRef } from "react";
import { useForm, router, usePage } from "@inertiajs/react";
/* material ui */
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Grid2 from "@mui/material/Grid2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
/* icons */
import PersonIcon from "@mui/icons-material/Person";
import PaymentsIcon from "@mui/icons-material/Payments";
import RequestPageIcon from "@mui/icons-material/RequestPage";
/* custom */
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import MensajeError from "@/Components/MensajeError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import TicketsSeleccionados from "./TicketsSeleccionados";
import CompraConfirm from "./CompraConfirm";
import CompraExito from "./CompraExito";
import InfoPago from "./InfoPago";
import CameraInput from "./CamaraInput";
import WhatsappButton from "./WhatsappButton";

export default function FormCompra({ jugada, ticketsSel, onFinVenta }) {
  const idsTicketSel = ticketsSel.map((ticket) => ticket.nu_numero);
  const cameraInputRef = useRef(null);
  const props = usePage().props;

  const {
    data,
    setData,
    processing,
    errors,
    post,
    reset,
    hasErrors,
    transform,
    clearErrors,
    setError,
  } = useForm({
    nombre: "",
    codigo: 58,
    celular: "",
    whatsapp: false,
    comprobante: "",
    tickets: [],
    idJugada: jugada.id,
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const Tickets = idsTicketSel;
  const CantTickets = ticketsSel.length;
  const existenTickets = CantTickets > 0;

  var ticketsList = ticketsSel.map((ticket) => {
    return String(ticket.nu_numero).padStart(3, "0") + " ";
  });

  const textoWhatsapp =
    "Compra de Ticket(s) " +
    ticketsList +
    " (" +
    CantTickets +
    ")  Jugada " +
    jugada.id;

  const confirm = (e) => {
    e.preventDefault();
    if (CantTickets < 1) {
      alert("Seleccione tickets");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    transform((data) => ({
      ...data,
      tickets: Tickets,
    }));

    if (!data.whatsapp && data.comprobante === "") {
      alert("El comprobante es Obligatorio");
      return;
    }
    setShowConfirm(true);
  };

  const create = () => {
    setShowConfirm(false);
    post(route("compra.store"), {
      _method: "put",
      _token: props.csrf_token,
      forceFormData: !data.whatsapp,
      preserveScroll: true,
      onSuccess: (page) => {
        console.log(page);

        if(page.props.success)
        {
          try {
            fbq('track', 'Purchase', {currency: "USD", value: CantTickets*jugada.mo_valor_divisa});
          } catch (error) {
            console.log("Error al enviar evento de compra a Facebook Pixel", error);
          }
          setShowSuccess(true);
        }else{
          setError('comprobante', 'Ocurrio un error al cargar la compra intente nuevamente.');
        }
      },
    });
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    reset();
    if (cameraInputRef.current) {
      cameraInputRef.current.clearImage();
    }
    router.reload({ only: ["jugada"] });
    window.scrollTo({ top: 0, behavior: "smooth" });
    onFinVenta();
  };

  var handleCelular = (celularVal) => {
    setData("celular", celularVal);
  };

  var handleWhatsapp = (whatsapp) => {
    setData("whatsapp", whatsapp);
    if (whatsapp) {
      setData("comprobante", "");
    }
  };

  var HandleChangeDataFile = (file) => {
    setData("comprobante", file);
  };

  var HandleCloseError = () =>{
    clearErrors()
  }

  return (
    <>
      {/* Mostrar Carga */}
      {processing && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={processing}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {/* Mostrar Confirmacion */}
      {showConfirm && (
        <CompraConfirm
          open={showConfirm}
          onCancel={() => setShowConfirm(false)}
          onConfirm={() => create()}
          data={data}
          tickets={Tickets}
          jugada={jugada}
        ></CompraConfirm>
      )}

      {/* Mostrar error */}
      {hasErrors && (
        <MensajeError
          open={hasErrors}
          onClose={() => HandleCloseError}
          errors={errors}
        ></MensajeError>
      )}

      {/* Mostrar éxito */}
      {showSuccess && (
        <CompraExito
          open={showSuccess}
          onClose={handleCloseSuccess}
          tickets={Tickets}
          jugada={jugada}
          venta={data}
        ></CompraExito>
      )}
      {/* Mostrar Tickets Seleccionados */}

      <TicketsSeleccionados
        open={existenTickets}
        ticketsSeleccionados={ticketsSel}
        jugada={jugada}
      ></TicketsSeleccionados>

      <form onSubmit={confirm}>
        <Card elevation={4} sx={{ borderRadius: 6 }} className="p-2">
          <CardHeader
            title={
              <Typography
                variant="title"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                DATOS PERSONALES
              </Typography>
            }
            avatar={
              <Avatar sx={{ bgcolor: "#e62a3c" }}>
                <PersonIcon />
              </Avatar>
            }
          ></CardHeader>
          <CardContent>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <InputLabel
                  htmlFor="nombre"
                  value="Nombre*"
                  size="large"
                  variant="filled"
                />

                <TextInput
                  id="nombre"
                  name="nombre"
                  className="mt-1 mb-3 block w-full"
                  value={data.nombre}
                  onChange={(e) => setData("nombre", e.target.value)}
                  required
                  autoComplete="nombre"
                  placeholder="Nombre Cliente"
                  title="Este campo es obligatorio."
                />

                <InputError className="mt-2" message={errors.nombre} />
              </Grid2>

              <Grid2 container size={{ xs: 12, md: 6 }}>
                <Grid2 size={4}>
                  <InputLabel htmlFor="codigo" value="Codigo*" />

                  <Select
                    name="codigo"
                    labelId="codigo"
                    value={58}
                    label="Codigo"
                    className="w-full"
                    sx={{ fontSize: "0.9rem" }}
                    onChange={(e) => setData("codigo", e.target.value)}
                  >
                    <MenuItem value={58}>+58 Ven</MenuItem>
                    <MenuItem value={57}>+57 Col</MenuItem>
                    <MenuItem value={56}>+53 Cl</MenuItem>
                  </Select>

                  <InputError className="mt-2" message={errors.codigo} />
                </Grid2>
                <Grid2 size={8}>
                  <InputLabel htmlFor="celular" value="Celular*" />

                  <TextInput
                    id="celular"
                    name="celular"
                    type="number"
                    className="mt-1 mb-3 block w-full"
                    value={data.celular}
                    onChange={(e) => handleCelular(e.target.value)}
                    autoComplete="celular"
                    placeholder="Ej: 04129396107"
                    pattern="[0-9]+"
                    required
                    title="Solo numeros, Este campo es obligatorio."
                  />

                  <InputError className="mt-2" message={errors.telefono} />
                </Grid2>
              </Grid2>
            </Grid2>
          </CardContent>

          <CardHeader
            title={
              <Typography
                variant="title"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                METODO DE PAGO
              </Typography>
            }
            avatar={
              <Avatar sx={{ bgcolor: "#e62a3c" }}>
                <PaymentsIcon></PaymentsIcon>
              </Avatar>
            }
          ></CardHeader>

          <CardContent>
            <InfoPago></InfoPago>
          </CardContent>

          <CardHeader
            title={
              <Typography
                variant="title"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                COMPROBANTE
              </Typography>
            }
            avatar={
              <Avatar sx={{ bgcolor: "#e62a3c" }}>
                <RequestPageIcon></RequestPageIcon>
              </Avatar>
            }
          ></CardHeader>

          <CardContent>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="whatsapp"
                    name="whatsapp"
                    checked={data.whatsapp}
                    color="success"
                    onChange={(e) => handleWhatsapp(e.target.checked)}
                  />
                }
                label={"Envio por Whatsapp"}
              />
            </FormGroup>

            {data.whatsapp ? (
              <>
              <WhatsappButton
                celular="+584129396107"
                texto={textoWhatsapp}
                loading={processing}
              />

            <Alert severity="warning" className="mt-2 mb-2">
              <Typography color="error" variant="body2">
              <b>Paso final:</b> Una vez enviado tu mensaje por WhatsApp, por favor, haz clic en el botón <b>"Comprar"</b>  para que podamos procesar tu compra.
              </Typography>
            </Alert>
            </>
            ) : (
              <CameraInput
                ref={cameraInputRef}
                onChangeDataFile={HandleChangeDataFile}
              />
            )}
          </CardContent>

          <CardActions>
            <div className="flex items-center gap-4">
              <PrimaryButton id="btnComprar" className="text-lg" disabled={processing}>
                Comprar
              </PrimaryButton>
            </div>
          </CardActions>
        </Card>
      </form>
    </>
  );
}
