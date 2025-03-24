<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
    <title>Nueva Venta</title>
</head>
<body>
    <p>Hola! Se ha reportado una nueva venta:  <b>Id-Venta: </b>{{ $venta->id }} <b>Fecha/Hora: </b> {{ $venta->created_at->format('m/d/Y h:i A') }}.</p>
    <p>Estos son los datos:</p>
    <ul>
        <li>Nombre: {{ $venta->tx_nombre_cliente }}</li>
        <li>Teléfono: {{ $venta->tx_celular_cliente }}</li>
        <li>Total Tickets: {{ $venta->mo_total_tickets }}</li>
        <li>Monto Venta: {{ $venta->mo_total_venta }}$</li>
    </ul>
    <p>Recuerda que hay un tiempo para confirmarla antes de que sea cancelada automaticamente:</p>
</body>