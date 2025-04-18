import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function ConstactanosFlotante() {
  const whatsappNumber = "+584243424885";
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
