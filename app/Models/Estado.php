<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    protected $fillable   = [
        'tx_nombre',
        'nb_secundario',
        'co_estado',
        'co_grupo',
        'tx_icono',
        'tx_color',
        'id_padre',
        'tx_observaciones',
        'bo_activo',
        'id_usuario'
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
