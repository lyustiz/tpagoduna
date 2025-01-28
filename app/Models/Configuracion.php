<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Configuracion extends Model
{
    public function estado()
	{
        return $this->BelongsTo(Estado::class, 'id_estado');
    }
}
