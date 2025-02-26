import React, { useState } from "react";
import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function CopyToClipboardButton({ textToCopy }) {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const handleCopyClick = () => {
    // Copiar el texto al portapapeles
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // Mostrar el mensaje "Copiado"
        setShowCopiedMessage(true);
        // Ocultar el mensaje después de 200 milisegundos
        setTimeout(() => {
          setShowCopiedMessage(false);
        }, 600);
      })
      .catch((error) => {
        console.error("Error al copiar el texto: ", error);
      });
  };

  return (
    <div style={{ position: "relative" }}>
      <IconButton edge="end" onClick={handleCopyClick}>
        <ContentCopyIcon color="primary" />
      </IconButton>
      {showCopiedMessage && (
        <div
          style={{
            position: "absolute",
            top: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "green",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          Copiado
        </div>
      )}
    </div>
  );
}
