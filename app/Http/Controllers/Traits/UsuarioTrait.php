<?php

namespace App\Http\Controllers\Traits;
use App\Models\Usuario;
use App\Models\TipoUsuario;
use App\Models\UsuarioPerfil;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Arr;

trait UsuarioTrait
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    static public function store(array $data)
    {
        $password     =  '12345678';
        
        $verification = Str::random(8);
        
        $usuario = Usuario::create([
            'nb_usuario'        => $data['nb_usuario'],
            'nb_nombres'        => $data['nb_nombres'],
            'id_colegio'        => $data['id_colegio'],
            'tx_email'          => $data['tx_email'],
            'password'          => Hash::make($password),
            'id_tipo_usuario'   => $data['id_tipo_usuario'],
            'id_origen'         => $data['id_origen'],
            'id_status'         => 1,
            'id_usuario'        => $data['id_usuario'],
            'verification'      => $verification
        ]);

        return $usuario;
    }

    static public function usuarioOrigenTipo($data, $idTipoUsuario)  
    {
        if($idTipoUsuario == 1) 
        {
            throw ValidationException::withMessages(['createAdministrador' => "No es posible crear usuario Administrador"]);
        }
                
        $tipoUsuario = TipoUsuario::find($idTipoUsuario);

        $idPerfil    = $tipoUsuario->id_perfil;

        $idColegio   = Usuario::find($data->id_usuario)->id_colegio; 

        $nbUsuario   = UsuarioTrait::makeNbUsuario($data);

        $dataUsuario = [
            'nb_usuario'      => $nbUsuario,
            'nb_nombres'      => strtolower($data->nb_nombre) . ' ' . strtolower($data->nb_apellido),
            'id_colegio'      => $idColegio,
            'tx_email'        => $data->tx_email,
            'id_tipo_usuario' => $idTipoUsuario,
            'id_origen'       => $data->id,
            'id_usuario'      => $data->id_usuario
        ];

        $usuario = UsuarioTrait::store($dataUsuario);

        $perfil  = UsuarioPerfil::create([
                    'id_usuario'     => $usuario->id,
                    'id_perfil'      => $idPerfil,
                    'id_status'      => 1,
                    'id_usuario_ed'  => $data->id_usuario
                    ]);       

        return [ 'msj' => "Usuarios Creados", 'usuario' => $usuario];
    }

    static public function makeNbUsuario($data)
    {
        $nbUsuario  = null;

        $nbApellido = strtolower(self::clean_string($data->nb_apellido));

        $nbUsuarios = Usuario::select('nb_usuario')
                              ->where('nb_usuario', 'like',"%$nbApellido%")
                              ->get()
                              ->pluck('nb_usuario')
                              ->toArray(); // ['lyustiz','ldyustiz','lyustiza','ldyustiza1' ...]
                              
                              
        for ($attempt = 1; $attempt <= 20 ; $attempt++) 
        { 
           $nbUsuario =  self::rulesNbUsuario($data, $attempt);
           
           if(!in_array($nbUsuario, $nbUsuarios))
           {
                break;
           }
        }
       
        return $nbUsuario;
    
    }

    static public function rulesNbUsuario($data, int $attempt)
    {
        switch ($attempt) {
            case 1: //lyustiz
                return   substr(strtolower(self::clean_string($data->nb_nombre)), 0, 1) 
                       . strtolower(self::clean_string($data->nb_apellido));
                break;
            
            case 2: //ldyustiz
                return   strtolower(substr(self::clean_string($data->nb_nombre),  0, 1)) 
                       . strtolower(substr(self::clean_string($data->nb_nombre2), 0, 1)) 
                       . strtolower(self::clean_string($data->nb_apellido));
                break;
            
            case 3: //ldyustiza
                return   strtolower(substr(self::clean_string($data->nb_nombre),  0, 1)) 
                       . strtolower(substr(self::clean_string($data->nb_nombre2), 0, 1)) 
                       . strtolower(self::clean_string($data->nb_apellido)) 
                       . strtolower(substr(self::clean_string($data->nb_apellido2), 0, 1));
                break;
            
            default: //ldyustiza1 - 20
                return   strtolower(substr(self::clean_string($data->nb_nombre),  0, 1)) 
                       . strtolower(substr(self::clean_string($data->nb_nombre2), 0, 1)) 
                       . strtolower(self::clean_string($data->nb_apellido)) 
                       . strtolower(substr(self::clean_string($data->nb_apellido2), 0, 1)) 
                       . ($attempt-3);
                break;
        }
    }

    static public function sendEmailLogin(Usuario $usuario )
    {
        //Enviar codigo de confirmacion
        \Mail::send('auth.mail.mail_created', $data, function($message) use ($data) {
            $message->to($usuario->tx_email, $usuario->nb_usario)->subject('"VirtuaLin.com", Usuario y contraseña de Ingreso');
        }); 
    }

    static function clean_string($string)
    {
    
        $string = trim($string);
    
        $string = str_replace(
            array('á', 'à', 'ä', 'â', 'ª', 'Á', 'À', 'Â', 'Ä'),
            array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
            $string
        );
    
        $string = str_replace(
            array('é', 'è', 'ë', 'ê', 'É', 'È', 'Ê', 'Ë'),
            array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
            $string
        );
    
        $string = str_replace(
            array('í', 'ì', 'ï', 'î', 'Í', 'Ì', 'Ï', 'Î'),
            array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
            $string
        );
    
        $string = str_replace(
            array('ó', 'ò', 'ö', 'ô', 'Ó', 'Ò', 'Ö', 'Ô'),
            array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
            $string
        );
    
        $string = str_replace(
            array('ú', 'ù', 'ü', 'û', 'Ú', 'Ù', 'Û', 'Ü'),
            array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
            $string
        );
    
        $string = str_replace(
            array('ñ', 'Ñ', 'ç', 'Ç'),
            array('n', 'N', 'c', 'C',),
            $string
        );
    
        //Esta parte se encarga de eliminar cualquier caracter extraño
        $string = str_replace(
            array( "¨", "º", "-", "~",
                "#", "@", "|", "!", '"',
                "·", "$", "%", "&", "/",
                "(", ")", "?", "'", "¡",
                "¿", "[", "^", "<code>", "]",
                "+", "}", "{", "¨", "´",
                ">", "< ", ";", ",", ":",
                ".", " "),
            '',
            $string
        );
    
    
        return $string;
    }

    


}
