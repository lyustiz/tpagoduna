import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";
import { useForm } from "@inertiajs/react";
import MensajeError from "@/Components/MensajeError";
import MensajeExito from "@/Components/MensajeExito";

const StyledUploadButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 32,
  padding: 0,
}));

const HiddenInput = styled("input")({
  display: "none",
});

const UploadComprobante = ({ venta, text }) => {
  const inputFileRef = useRef(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    data,
    setData,
    post,
    processing,
    reset,
    hasErrors,
    errors,
    clearErrors,
    setError,
  } = useForm({
    comprobante: null,
  });

  const handleUploadClick = () => {
    inputFileRef.current.click();
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setData("comprobante", file); // Store the file in the form data
      };

      reader.onerror = () => {
        setError("warning", "Error al leer el archivo");
      };

      reader.readAsDataURL(file);
    } else {
      setError("warning", "Por favor, selecciona un archivo de imagen");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("ventas.comprobante", { id: venta.id }), {
      _method: "put",
      forceFormData: true,
      onSuccess: () => {
        setShowSuccess(true);
        alert("Comprobante cargado con éxito.");
        reset();
        setSelectedImage(null);
      },
    });
  };

  return (
    <>
      <div>
        {hasErrors && (
          <MensajeError
            open={hasErrors}
            onClose={() => clearErrors()}
            errors={errors}
          ></MensajeError>
        )}

        {/* Mostrar éxito */}
        {showSuccess && (
          <>
          <MensajeExito
            open={showSuccess}
            onClose={() => setShowSuccess(false)}
            mensaje={"Comprobante cargado con éxito."}
          ></MensajeExito>
          </>
        )}

        {!selectedImage && (
          <>
            <StyledUploadButton
              onClick={handleUploadClick}
              aria-label="upload button"
            >
              <UploadIcon color="primary" />
              <Typography variant="caption" gutterBottom>
                {text}
              </Typography>
            </StyledUploadButton>
          </>
        )}
        {selectedImage && (
          <>
            <img
              onClick={handleUploadClick}
              src={selectedImage}
              alt="Imagen seleccionada"
              style={{ width: 80, height: 32, objectFit: "cover" }}
            />

            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              size="small"
              sx={{ marginTop: 1 }}
            >
              {processing ? "Subiendo..." : "Subir"}
            </Button>
          </>
        )}
        <HiddenInput
          type="file"
          ref={inputFileRef}
          name="comprobante"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
    </>
  );
};

UploadComprobante.propTypes = {
  text: PropTypes.string.isRequired,
  venta: PropTypes.object.isRequired, // Ensure venta is passed as a prop and is an object
};

export default UploadComprobante;
