<?php

namespace App\Http\Controllers\Traits;
use App\Models\Archivo;
use App\Models\TipoArchivo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

trait ArchivoTrait
{
    static public function store(Request $request)
    {
        $validate = self::validateData($request);

        $request->merge(['tx_path' => self::replaceSpecialChars($request->tx_path) ]);

        $archivo = Archivo::create($request->all());

        $tipoArchivo = TipoArchivo::where('id', $request->id_tipo_archivo)->first();

        $fileSource = $request->tx_file_source;
        $storage    = $tipoArchivo->tx_storage;
        $fileName   = $request->tx_path;
        $folder     = $request->tx_origen_id;

        $file = self::writeFile($fileSource, $storage, $fileName, $folder);

        return [ 'msj' => 'Archivo Agregado Correctamente', ['archivo' => $archivo, 'file' =>  $file ] ];
    }

    static public function validateData($request)
    {
        $validate = request()->validate([
            'nb_archivo'        => 	'required|string|max:30',
			'id_tipo_archivo'   => 	'required|integer|max:999999999',
			'tx_origen_id'      => 	'required|integer|max:999999999',
            'tx_path'           => 	'required|string|max:255',
            'tx_mimetype'       => 	'required|string|max:30',
			'tx_observaciones'  => 	'nullable|string|max:100',
			'id_status'         => 	'required|integer|max:999999999',
            'id_usuario'        => 	'required|integer|max:999999999',
            'tx_file_source'    => 	'required|string',
        ]);

        return $validate;
    }
    
    static public function UploadComprobante(Request $request, int $idJugada, array $tickets)
    {
        $tipoArchivo = TipoArchivo::where('id', 1)->first();
        $fileSource = $request->file(key: 'comprobante');
        $storage    = $tipoArchivo->tx_storage;
        $fileName   = implode("-", $tickets);
        $folder     = str_pad($idJugada, 3, "0", STR_PAD_LEFT);
    
        try {
            $file = ArchivoTrait::writeFile($fileSource, $storage, $fileName, $folder);
            return new FileResponse(true, $file);
        } catch (\Exception $e) {
            return new FileResponse(false, null, 'Error al subir el comprobante intente nuevamente');
        }
    }

    static public function DeleteComprobante(string $path)
    {
        $tipoArchivo = TipoArchivo::where('id', 1)->first();
        $storage     = $tipoArchivo->tx_storage;
    
        try {
            ArchivoTrait::deleteFile( $storage, $path);
            return new FileResponse(true, null);
        } catch (\Exception $e) {
            return new FileResponse(false, $path, 'Error al eliminar el comprobante intente nuevamente. '. $e->getMessage());
        }
    }

    static public function writeFile($fileSource, $storage, $fileName, $folder)
	{
        $fileName =  $fileName. '_' .time() . '.'.$fileSource->getClientOriginalExtension();
        return   Storage::disk($storage)->putFileAs($folder, $fileSource, $fileName);
    }

    static public function deleteFile( $storage, $path )
    {
       return Storage::disk($storage)->delete($path);
    }

    static function replaceSpecialChars($string) 
    {
        $string = str_replace(' ', '-', $string); 
     
        return preg_replace('/[^A-Za-z0-9\-]/', '-', $string);
    }
}

class FileResponse
{
    public $ok;
    public $file;
    public $error;

    public function __construct(bool $ok, ?string $file, ?string $error = null)
    {
        $this->ok = $ok;
        $this->file = $file;
        $this->error = $error;
    }
}
