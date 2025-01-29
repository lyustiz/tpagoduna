<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ConfiguracionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "referencia" => $this->referencia,
            "valor" => $this->valor,
            "descripcion" => $this->descripcion,
            "estado" => $this->estado,
            "usuario" => new UserResource($this->usuario),
            "created_at" => $this->created_at->format('d-m-Y H:i'),
        ];
    }
}
