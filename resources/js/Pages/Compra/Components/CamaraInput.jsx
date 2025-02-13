import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default forwardRef(function CameraInput(
  { onChangeDataFile, className = "", ...props },
  ref
) {
  const fileInputRef = useRef(null);

  const [imageSrc, setImageSrc] = useState(null); 
  const [error, setError] = useState(null); 
  
  
  useImperativeHandle(ref, () => ({
    clearImage: () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setImageSrc(null); 
      setError(null); 
    },
  })); // Referencia al input de tipo file

  // Función para manejar la selección de archivos
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
      const reader = new FileReader(); // Crear un FileReader para leer el archivo

      // Cuando el archivo se haya leído, actualizar el estado con la imagen
      reader.onload = (e) => {
        setImageSrc(e.target.result); // Guardar la imagen en el estado como una URL de datos
        setError(null); // Limpiar el mensaje de error si existe
      };

      reader.readAsDataURL(file);
      onChangeDataFile(event.target.files[0]); // Leer el archivo como una URL de datos
    }
  };

  return (
    <div>
      {/* Input de tipo file visible y estilizado como un botón */}
      <label className="flex flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <CloudUploadIcon className="text-white"></CloudUploadIcon>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">
              Tomar Foto o Subir imagen del comprobante
            </span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG o GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          type="file"
          accept="image/*" // Aceptar solo archivos de imagen
          capture="environment" // Iniciar la cámara trasera (o "user" para la frontal)
          onChange={handleFileChange} // Manejar el cambio de archivo
          ref={fileInputRef}
          style={{ display: "none" }}
          {...props}
          // Ocultar el input real
        />
      </label>

      {/* Mostrar la imagen capturada */}
      {imageSrc && (
        <div className="foto" style={{ margin: "20px 0" }}>
          <h2>Comprobante:</h2>
          <img
            src={imageSrc}
            alt="Captura"
            style={{
              width: "100%",
              maxWidth: "200px",
              borderRadius: "8px",
              height: "100%",
              maxHeight: "200px",
            }}
          />
        </div>
      )}

      {/* Mostrar mensaje de error */}
      {error && <p style={{ color: "red", margin: "10px 0" }}>{error}</p>}
    </div>
  );
});
