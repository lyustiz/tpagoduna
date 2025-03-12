import { Chip } from "@mui/material";

const EstadoJugada = ({ id_estado }) => {
    const getEstado = (id_estado) => {
        switch (id_estado) {
            case 1:
                return {color: 'success', text: 'Activo'};
            case 2:
                return {color: '', text: 'Inactivo'};
            case 7:
                return {color: 'error', text: 'Cerrado'};
            default:
                return {color: '', text: 'Desconocido'};
        }
    };

    const estado = getEstado(id_estado);

    return (
        <Chip label={estado.text} size="small" color={estado.color} />
    );
};

export default EstadoJugada;