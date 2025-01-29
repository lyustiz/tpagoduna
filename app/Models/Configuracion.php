<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Configuracion extends Model
{
    use HasFactory;

    protected $table 	  = 'Configuraciones';

    protected $fillable   = [
        'referencia',
        'descripcion',
        'valor',
        'id_estado',
        'id_usuario'
       ]; 

    public function estado()
	{
        return $this->BelongsTo('App\Models\Estado', 'id_estado');
    }

    public function usuario()
	{
        return $this->BelongsTo(User::class, 'id_usuario');
    }
}
