<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    public const PENDIENTE = 3;
    public const RESERVADO = 4;
    public const VENDIDO = 5;
    public const CANCELADO = 6;
    protected $fillable   = [
        'id_jugada',
        'nu_numero',
        'id_venta',
        'id_cliente',
        'id_estado',
        'tx_observaciones',
        'id_usuario',
       ]; 

    protected $hidden     = [
            'created_at',
            'updated_at'
        ];

    public function getNumeroTicketAttribute()
    {
        return str_pad($this->nu_numero, 3, '0', STR_PAD_LEFT);
    }

    public function scopePendiente($query)
    {
        return $query->where('id_estado', $this::PENDIENTE);
    }

    public function scopeReservado($query)
    {
        return $query->where('id_estado', $this::RESERVADO);
    }

    public function scopeVendido($query)
    {
        return $query->where('id_estado', $this::VENDIDO);
    }

    public function estado()
    {
        return $this->BelongsTo(Estado::class, 'id_estado');
    }

    public function jugada()
    {
        return $this->BelongsTo(Jugada::class, 'id_jugada');
    }

    public function venta()
    {
        return $this->BelongsTo(Venta::class, 'id_venta');
    }
}
