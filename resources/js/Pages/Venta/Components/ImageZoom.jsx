import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: 60,
  height: 32,
  overflow: "visible",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(4.5)",
  },
  cursor: "pointer"
}));

const ModalContent = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw", // 80% del ancho de la pantalla
  height: "80vh", // 80% del alto de la pantalla
  maxWidth: "80vw",
  maxHeight: "80vh",
  backgroundColor: "#fff",
  padding: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden", // Para evitar que la imagen se salga del modal
});

export default function ImageZoom({ src, alt }) {
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  const handleOpen = (image) => {
    setModalImage(image);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Item elevation={0} onClick={() => handleOpen("tu-imagen.jpg")}>
        {" "}
        {/* <-- Añadido onClick */}
        
        {
         src ? 
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        : "Sin " + alt }
      </Item>

      <Modal open={open} onClose={handleClose}>
        <ModalContent>
          <img
            src={src}
            alt="Imagen grande"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </ModalContent>
      </Modal>
    </div>
  );
}
