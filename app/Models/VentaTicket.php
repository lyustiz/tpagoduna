<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VentaTicket extends Model
{
    protected $fillable   = [
        'id_jugada',
        'id_venta',
        'id_ticket',
        'nu_ticket',
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
        return $this->HasMany(Ticket::class, 'id_ticket');
    }

    public function ventas()
    {
        return $this->HasMany(Ticket::class, 'id_venta');
    }
}
