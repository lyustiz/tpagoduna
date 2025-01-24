<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConfiguracionSorteo extends Model
{
    protected $fillable   = [
            'id_loteria',
            'nu_lun',
            'nu_mar',
            'nu_mie',
            'nu_jue',
            'nu_vie',
            'nu_sab',
            'nu_dom',
            'hh_hora',
            'mm_cierre',
            'id_estado',
            'tx_observaciones',
            'id_usuario',
       ]; 

    protected $hidden = ['created_at', 'updated_at' ];


    public function scopeActivo($query)
    {
        return $query->where('id_estado', 1);
    }

    public function estado()
	{
        return $this->BelongsTo('App\Models\Estado', 'id_estado');
    }
}
