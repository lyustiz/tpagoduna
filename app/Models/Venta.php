<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venta extends Model
{
    protected $fillable   = [
        'id_jugada',
        'mo_total_tickets',
        'mo_total_venta',
        'tx_nombre_cliente',
        'tx_cedula_cliente',
        'tx_celular_cliente',
        'tx_correo_cliente',
        'tx_comprobante',
        'tx_referencia',
        'id_estado',
        'tx_observaciones',
        'id_usuario',
    ];

    protected $hidden     = [
        'updated_at'
    ];

    public function scopeActivo($query)
    {
        return $query->where('id_estado', 1);
    }

    public function estado()
    {
        return $this->BelongsTo(Estado::class, 'id_estado');
    }

    public function usuario()
    {
        return $this->BelongsTo(Estado::class, 'id_usuario');
    }

    public function tickets()
    {
        return $this->HasMany(Ticket::class, 'id_venta');
    }
}
