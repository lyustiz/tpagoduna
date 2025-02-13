<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $fillable   = [
        'id_jugada',
        'nu_numero',
        'id_cliente',
        'id_estado',
        'tx_observaciones',
        'id_usuario',
       ]; 

    protected $hidden     = [
            'created_at',
            'updated_at'
        ];


    public function scopePendiente($query)
    {
        return $query->where('id_estado', 3);
    }

    public function scopeReservado($query)
    {
        return $query->where('id_estado', 4);
    }

    public function scopeVendido($query)
    {
        return $query->where('id_estado', 5);
    }

    public function estado()
    {
        return $this->BelongsTo(Estado::class, 'id_estado');
    }
}
