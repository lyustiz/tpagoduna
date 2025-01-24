<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perfil extends Model
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

       public function scopeActivo($query)
       {
           return $query->where('id_estado', 1);
       }
   
       public function estado()
       {
           return $this->BelongsTo('App\Models\Estado', 'id_estado');
       }
}
