<?php

namespace Database\Seeders;

use App\Enum\PermisosEnum;
use App\Enum\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $rolUser = Role::create(['name' => RolesEnum::User->value]);
        $rolVendedor = Role::create(['name' => RolesEnum::Vendedor->value]);
        $rolAdmin = Role::create(['name' => RolesEnum::Admin->value]);

        $permisoAdministrarConfiguracion = Permission::create(['name'=> PermisosEnum::AdministrarConfiguracion->value]);
        $permisoAdministrarJugadas = Permission::create(['name'=> PermisosEnum::AdministrarJugadas->value]);
        $permisoAdministrarUsuarios = Permission::create(['name'=> PermisosEnum::AdministrarUsuarios->value]);
        $permisoRealizarVenta = Permission::create(['name'=> PermisosEnum::RealizarVenta->value]);
        $permisoComprarTicket = Permission::create(['name'=> PermisosEnum::ComprarTicket->value]);

        $rolAdmin->syncPermissions([$permisoAdministrarConfiguracion, $permisoAdministrarJugadas, $permisoAdministrarUsuarios, $permisoRealizarVenta]);
        $rolUser->syncPermissions([$permisoComprarTicket]);
        $rolVendedor->syncPermissions([$permisoRealizarVenta]);

        User::factory()->create([
            'name' => 'admin','email' => 'admin@example.com',
        ])->assignRole(RolesEnum::Admin);

        User::factory()->create([
            'name' => 'vendedor','email' => 'vendedor@example.com',
        ])->assignRole(RolesEnum::Vendedor);

        User::factory()->create([
            'name' => 'user','email' => 'user@example.com',
        ])->assignRole(RolesEnum::User);
    }
}
