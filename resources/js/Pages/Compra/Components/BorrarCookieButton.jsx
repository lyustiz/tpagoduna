import IconButton from "@mui/material/IconButton";
import SettingsIcon from '@mui/icons-material/Settings';


export default function BorrarCookieButton () {

    const HandleClick = () => {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const nombre = cookie.split("=")[0].trim();
          eliminarCookie(nombre);
        }
        location.reload();
      }

    function eliminarCookie(nombre) {
    document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    return (
        <>
        <IconButton variant="contained" onClick={HandleClick} color="warning">
        <SettingsIcon />

        </IconButton>
        </>
    );
}