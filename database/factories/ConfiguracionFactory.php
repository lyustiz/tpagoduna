<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use \app\Models\User;
use \app\Models\Estado;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Configuracion>
 */
class ConfiguracionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "referencia"=> fake()->colorName(),
            "descripcion"=> fake()->text(64),
            "valor"=> fake()->numberBetween(1,20),
            "id_estado"=>  Estado::all()->random()->id,
            "id_usuario"=> User::where('email','admin@example.com')->first()->id,
        ];
    }
}
