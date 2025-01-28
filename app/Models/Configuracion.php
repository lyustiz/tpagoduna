<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Configuracion extends Model
{
    use HasFactory;
    public function estado()
	{
        return $this->BelongsTo(Estado::class, 'id_estado');
    }
}
