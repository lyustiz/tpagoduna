import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import  IconButton  from "@mui/material/IconButton";

export default function MenuCompra() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReload = () => {
    setAnchorEl(null);
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const nombre = cookie.split("=")[0].trim();
      eliminarCookie(nombre);
    }
    location.reload();
  };

  function eliminarCookie(nombre) {
    document.cookie =
      nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleReload}>Recargar</MenuItem>
      </Menu>
    </div>
  );
}
