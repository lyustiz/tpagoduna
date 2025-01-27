<?php

namespace App\Enum;

enum PermisosEnum: string
{
    case AdministrarConfiguracion = 'administrar_configuracion';

    case AdministrarUsuarios = 'administrar_usuarios';

    case AdministrarJugadas = 'administrar_jugadas';

    case RealizarVenta = 'realizar_venta';

    case ComprarTicket = 'comprar_ticket';
}
