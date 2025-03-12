<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Jugada;
use App\Models\TipoArchivo;
use App\Http\Controllers\Traits\ArchivoTrait;
use App\Models\Ticket;
use App\Models\Venta;
use App\Models\VentaTicket;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
class CompraController extends Controller
{
    use ArchivoTrait;

    private const PENDIENTE = 3;
    private const RESERVADO = 4;
    private const VENDIDO = 5;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jugada = Jugada::activo()->latest()->with('tickets')->first();

        if ($jugada) {
            $this->validarVentasVencidas($jugada);
            $jugada->load('tickets');
        }

        return Inertia::render("Compra/Index", [
            "jugada" => $jugada
        ]);
    }

    private function validarVentasVencidas(Jugada $jugada)
    {
        try {
            $result = DB::select('CALL psCancelarVentaSinConfirmar(?)', [$jugada->id]); //
        } catch (\Throwable $th) {
            return $th->getMessage();
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idJugada' => 'required|integer',
            'nombre' => 'required|string',
            'codigo' => 'required|integer',
            'celular' => 'required|numeric',
            'tickets' => 'required|array',
            'whatsapp' => 'nullable|boolean'
        ]);
        
        $validator->sometimes('comprobante', 'required|file', function ($input) {
            return $input->whatsapp !== true;
        });
        
        $validator->validate();

        $jugada = Jugada::where('id', $request->idJugada)->first();

        $cantTickets = count($request->tickets);

        $totalventa = count($request->tickets) * $jugada->mo_valor_ticket;

        $tickets = Ticket::whereIn('id', $request->tickets)->get();

        if ($tickets->contains('id_estado', self::RESERVADO)) {
            return redirect()->back()->withErrors([
                'warning' => 'Existen cartones Reservados'
            ]);
        }

        if ($tickets->contains('id_estado', self::VENDIDO)) {
            return redirect()->back()->with([
                'warning' => 'Existen cartones Vendidos'
            ]);
        }

        DB::beginTransaction();

        try {

            if (!$request->whatsapp) {

                $tipoArchivo = TipoArchivo::where('id', 1)->first();
                $fileSource = $request->file(key: 'comprobante');
                $storage    = $tipoArchivo->tx_storage;
                $fileName   = implode("-", $request->tickets);
                $folder     = str_pad($request->idJugada, 3, "0", STR_PAD_LEFT);


                try {
                    $file = ArchivoTrait::writeFile($fileSource, $storage, $fileName, $folder);
                } catch (\Exception $e) {
                    return redirect()->back()->withErrors([
                        'error' => 'Error al subir el comprobante intente nuevamente'
                    ]);
                }
            } else {
                $file = '';
            }

            $venta =  Venta::create([
                "id_jugada" => $request->idJugada,
                "mo_total_tickets" => $cantTickets,
                "mo_total_venta" => $totalventa,
                "tx_nombre_cliente" => $request->nombre,
                "tx_celular_cliente" => $request->codigo . '-' . $request->celular,
                "tx_comprobante" => $file,
                "id_estado" => self::RESERVADO,
                "id_usuario" => 1
            ]);

            $ticketsToUpdate = Ticket::where('id_jugada', $request->idJugada)
                ->whereIn('nu_numero', $request->tickets)
                ->get();
 
            foreach ($ticketsToUpdate as $ticket) {
                $ticket->update([
                    'id_venta' => $venta->id,
                    'id_estado' => self::RESERVADO,
                    'id_usuario' => 1
                ]);
            }

            $ventasTiket = [];
            foreach ($ticketsToUpdate as $ticket) {
                $ventasTiket[] = [
                    'id_jugada' => $request->idJugada,
                    'id_venta' => $venta->id,
                    'id_ticket' => $ticket->id,
                    'nu_ticket' => $ticket->nu_numero,
                    'id_estado' => self::RESERVADO,
                    'tx_observaciones' => $request->observaciones,
                    'id_usuario' => 1
                ];
            }

            VentaTicket::insert($ventasTiket);

            DB::commit();

            return redirect()->back()->with(
                key: [
                    'venta' => $venta,
                    'idventa' => $venta->id,
                    'success' => 'Registro actualizado correctamente.',
                ]
            );
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            return redirect()->back()->withErrors([
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
