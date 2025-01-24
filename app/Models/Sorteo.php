<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sorteo extends Model
{
    protected $fillable   = [
        'fe_fecha',
        'hh_hora',
        'id_loteria',
        'id_configuracion_sorteo',
        'nu_numero1',
        'nu_numero2',
        'nu_numero3',
        'nu_numero4',
        'nu_numero5',
        'nu_numero6',
        'nu_extra',
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
