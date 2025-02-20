import { Chip } from "@mui/material";

const EstadoVenta = ({ id_estado }) => {
    const getEstado = (id_estado) => {
        switch (id_estado) {
            case 3:
                return {color: '', text: 'Pendiente'};
            case 4:
                return {color: 'info', text: 'Reservada'};
            case 5:
                return {color: 'success', text: 'Vendida'};
            case 6:
                return {color: 'error', text: 'Cancelada'};
            default:
                return {color: '', text: 'Desconocido'};
        }
    };

    const estado = getEstado(id_estado);

    return (
        <Chip label={estado.text} size="small" color={estado.color} />
    );
};

export default EstadoVenta;