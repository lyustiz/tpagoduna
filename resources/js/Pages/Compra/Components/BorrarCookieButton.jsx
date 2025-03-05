import { Button } from "@mui/material";

export default function BotonBorrarCookies () {

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
        <Button variant="contained" onClick={HandleClick} color="warning">
            Reparar
        </Button>
        </>
    );
}