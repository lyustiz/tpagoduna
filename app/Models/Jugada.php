<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jugada extends Model
{
    protected $fillable   = [
        'fe_fecha',
        'nu_tickets',
        'mo_valor_ticket',
        'mo_valor_divisa',
        'nu_minutos_cierre',
        'id_estado',
        'tx_observaciones',
        'id_usuario',
    ];

    protected $hidden     = [
        'created_at',
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

    public function tickets()
    {
        return $this->HasMany(Ticket::class, 'id_jugada');
    }
}
