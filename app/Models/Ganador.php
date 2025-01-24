<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ganador extends Model
{
    protected $fillable   = [
            'id_ticket',
            'id_loteria',
            'id_sorteo',
            'id_jugada',
            'id_jugada_sorteo',
            'bo_pagado',
            'id_estado',
            'tx_observaciones',
            'id_usuario',
        ]; 

    protected $hidden     = [ 'created_at', 'updated_at' ];


    public function scopeActivo($query)
    {
        return $query->where('id_estado', 1);
    }

    public function estado()
	{
        return $this->BelongsTo('App\Models\Estado', 'id_estado');
    }
}
