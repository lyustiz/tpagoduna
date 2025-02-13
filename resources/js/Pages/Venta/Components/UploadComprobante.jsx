import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import UploadIcon from '@mui/icons-material/CloudUpload';
import Typography from '@mui/material/Typography';

const StyledUploadButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 32,
  padding: 0,
}));

const HiddenInput = styled('input')({
  display: 'none',
});

const UploadComprobante = ({ text }) => {
  const inputFileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUploadClick = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };

      reader.onerror = () => {
        alert('Error al leer el archivo.');
      };

      reader.readAsDataURL(file);
    } else {
      alert('Por favor, selecciona un archivo de imagen.');
    }
  };

  return (
    <div>
      {!selectedImage && (
        <>
          
          <StyledUploadButton onClick={handleUploadClick} aria-label="upload button">
            <UploadIcon color='primary' />
            <Typography variant="caption" gutterBottom>
            {text}
          </Typography>
          </StyledUploadButton>
        </>
      )}
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Imagen seleccionada"
          style={{ width: 80, height: 32, objectFit: 'cover' }}
        />
      )}
      <HiddenInput
        type="file"
        ref={inputFileRef}
        onChange={handleFileChange}
        accept="image/*"
      />
    </div>
  );
};

UploadComprobante.propTypes = {
  text: PropTypes.string.isRequired,
};

export default UploadComprobante;