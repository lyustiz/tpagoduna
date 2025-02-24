import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Grid2,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Switch,
  Snackbar,
  Fade,
  Alert,
} from "@mui/material";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, router, usePage } from "@inertiajs/react";
import PersonIcon from "@mui/icons-material/Person";
import PaymentsIcon from "@mui/icons-material/Payments";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import WhatsappButton from "./WhatsappButton";
import InfoPago from "./InfoPago";
import CameraInput from "./CamaraInput";
import MensajeError from "@/Components/MensajeError";
//import MensajeExito from "@/Components/MensajeExito";
import CompraConfirm from "./CompraConfirm";
import CompraExito from "./CompraExito";

export default function FormCompra({ jugada, ticketsSel, onFinVenta }) {
  const idsTicketSel = ticketsSel.map((ticket) => ticket.id);
  const cameraInputRef = useRef(null);
  const props = usePage().props;
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  };
  const {
    data,
    setData,
    processing,
    errors,
    post,
    reset,
    recentlySuccessful,
    hasErrors,
    transform,
    clearErrors,
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

  const textoWhatsapp =
    "Compra de " + CantTickets + " Ticket(s) Jugada " + jugada.id;

  const confirm = (e) => {
    e.preventDefault();
    if (CantTickets < 1) {
      alert("Seleccione tickets");
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
    setShowConfirm(false)
    post(route("compra.store"), {
      _method: "put",
      _token: props.csrf_token,
      forceFormData: !data.whatsapp,
      preserveScroll: true,
      onSuccess: (page) => {
        console.log(page)
        setShowSuccess(true);
      },
    });
  };

  const handleCloseSuccess = () => {
    console.log("handleCloseSuccess");
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

  return (
    <>
      {/* Mostrar Confirmacion */}
      {showConfirm &&
      <CompraConfirm
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => create()}
        data={data}
        tickets={Tickets}
        jugada={jugada}
      ></CompraConfirm>}

      {/* Mostrar error */}
      <MensajeError
        open={hasErrors}
        onClose={() => clearErrors()}
        errors={errors}
      ></MensajeError>

      {/* Mostrar éxito */} 
      <CompraExito
        open={showSuccess}
        onClose={handleCloseSuccess}
        tickets={Tickets}
        jugada={jugada}
      ></CompraExito>

      <form onSubmit={confirm}>
        <Card>
          <CardHeader
            title="DATOS PERSONALES"
            avatar={
              <Avatar>
                <PersonIcon />
              </Avatar>
            }
          ></CardHeader>
          <CardContent>
            <Grid2 container spacing={2}>
              <Grid2 item xs={12} md={4}>
                <div>
                  <InputLabel htmlFor="nombre" value="Nombre*" />

                  <TextInput
                    id="nombre"
                    className="mt-1 mb-3 block w-full"
                    value={data.nombre}
                    onChange={(e) => setData("nombre", e.target.value)}
                    required
                    autoComplete="nombre"
                    title="Este campo es obligatorio."
                  />

                  <InputError className="mt-2" message={errors.nombre} />
                </div>
              </Grid2>

              <Grid2 item xs={4} md={2}>
                <div>
                  <InputLabel htmlFor="codigo" value="Codigo*" />

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={58}
                    label="Age"
                    className="w-full"
                    onChange={(e) => setData("codigo", e.target.value)}
                  >
                    <MenuItem value={58}>+58 Ven</MenuItem>
                    <MenuItem value={57}>+57 Col</MenuItem>
                    <MenuItem value={56}>+53 Cl</MenuItem>
                  </Select>

                  <InputError className="mt-2" message={errors.codigo} />
                </div>
              </Grid2>

              <Grid2 item xs={8} md={4}>
                <div>
                  <InputLabel htmlFor="celular" value="Celular " />

                  <TextInput
                    id="celular"
                    type="number"
                    className="mt-1 mb-3 block w-full"
                    value={data.celular}
                    onChange={(e) => handleCelular(e.target.value)}
                    autoComplete="celular"
                    pattern="[0-9]+"
                    required
                    title="Solo numeros, Este campo es obligatorio."
                  />

                  <InputError className="mt-2" message={errors.telefono} />
                </div>
              </Grid2>
            </Grid2>
          </CardContent>

          <CardHeader
            title="METODO DE PAGO"
            avatar={
              <Avatar>
                <PaymentsIcon></PaymentsIcon>
              </Avatar>
            }
          ></CardHeader>

          <CardContent>
            <InfoPago></InfoPago>
          </CardContent>

          <CardHeader
            title="COMPROBANTE"
            avatar={
              <Avatar>
                <RequestPageIcon></RequestPageIcon>
              </Avatar>
            }
          ></CardHeader>

          <CardContent>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    id="celular"
                    checked={data.whatsapp}
                    color="success"
                    onChange={(e) => handleWhatsapp(e.target.checked)}
                  />
                }
                label={"Envio por Whatsapp"}
              />
            </FormGroup>

            {data.whatsapp ? (
              <WhatsappButton
                celular="+584129396107"
                texto={textoWhatsapp}
                loading={processing}
              />
            ) : (
              <CameraInput
                ref={cameraInputRef}
                onChangeDataFile={HandleChangeDataFile}
              />
            )}
          </CardContent>

          <CardActions>
            <div className="flex items-center gap-4">
              <PrimaryButton disabled={processing}>Comprar</PrimaryButton>

              <Transition
                show={recentlySuccessful}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
              >
                <p className="text-sm text-gray-600">Saved.</p>
              </Transition>
            </div>
          </CardActions>
        </Card>
      </form>
    </>
  );
}
