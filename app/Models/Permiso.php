<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permiso extends Model
{
    protected $fillable   = [
        'tx_nombres',
        'tx_apellidos',
        'tx_cedula',
        'tx_telefono',
        'tx_correo',
        'tx_estado',
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
        return $this->BelongsTo('App\Models\Estado', 'id_estado');
    }
}
