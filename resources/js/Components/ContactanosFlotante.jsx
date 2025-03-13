import React from "react";
import { Snackbar, Button, Alert } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function ConstactanosFlotante() {
  const whatsappNumber = "+584129396107";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace("+", "")}`;

  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
        <Button
          component="a"
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ marginLeft: 2 }}
          variant="contained"
          color="success"
        >
          <WhatsAppIcon></WhatsAppIcon>&nbsp;Contactanos
        </Button>
    </Snackbar>
  );
}
