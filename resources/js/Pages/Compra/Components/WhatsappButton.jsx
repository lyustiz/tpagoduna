import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import  Button from "@mui/material/Button";

export default function WhatsappButton({loading, celular, texto, label }) {

    const url = new URL("https://wa.me/"+(celular || '00000'));
    const params = new URLSearchParams(url.search);
    params.append("text", (texto || 'enviar comprobante'));
    url.search = params.toString();
    label = label || 'Enviar Mensaje WhatsApp';

  return (
    <>
      <Button
        href={url.toString()}
        variant="contained"
        color="success"
        size="medium"
        target="_blank" rel="noopener noreferrer"
        startIcon={<WhatsAppIcon />}
        loading={loading}
      >
       {label}
      </Button>
    </>
  );
}
