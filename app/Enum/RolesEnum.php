<?php

namespace App\Enum;

enum RolesEnum: string
{
    case Admin = "admn";

    case User = "user";

    case Vendedor = "vendedor";

    public static function labels() {

        return [
            self::Admin->value => "Admin",
            self::User->value => "User",
            self::Vendedor->value => "Vendedor",
        ] ;
    }

    public function label(): string {
        return match($this) {
            self::Admin => 'Admin',
            self::User => 'User',
            self::Vendedor => 'Vendedor',
        };
    }

}
