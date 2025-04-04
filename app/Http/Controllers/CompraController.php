<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Jugada;
use App\Http\Controllers\Traits\ArchivoTrait;
use App\Mail\NotificacionVenta;
use App\Models\Ticket;
use App\Models\Venta;
use App\Models\VentaTicket;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
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
        ], [
            'idJugada.required' => 'El juego es invalido intente nuevamente.',
            'idJugada.integer' => 'El juego es invalido intente nuevamente.',
            'celular.required' => 'El campo celular es obligatorio.',
            'celular.numeric' => 'El campo celular debe ser solo números.',
            'tickets.required' => 'Los tickets son obligatorios.',
            'tickets.array' => 'Tickets invalidos.',
            'whatsapp.boolean' => 'El campo whatsapp invalidos',
            'comprobante.required' => 'El comprobante es obligatorio.',
            'comprobante.file' => 'El archivo del comprobante es inválido, intente nuevamente.'
        ]);
        
        $validator->sometimes('comprobante', 'required|file', function ($input) {
            return $input->whatsapp !== true;
        });
        
        $validator->validate();

        $jugada = Jugada::where('id', $request->idJugada)->first();

        $cantTickets = count($request->tickets);

        $totalventa = count($request->tickets) * $jugada->mo_valor_ticket;

        $tickets = Ticket::where('id_jugada', $jugada->id)
                 ->whereIn('nu_numero', $request->tickets)->get();

        $TicketsReservados = $tickets->where('id_estado', self::RESERVADO);

        if ($TicketsReservados->isNotEmpty()) {
            $reservedNumbers = $TicketsReservados->pluck('nu_numero')->implode(', ');
            return redirect()->back()->withErrors([
                'warning' => 'Existen tickets Reservados: ' . $reservedNumbers
            ]);
        }

        $TicketsVendidos = $tickets->where('id_estado', self::VENDIDO);

        if ($TicketsVendidos->isNotEmpty()) {
            $NumerosVendidos = $TicketsVendidos->pluck('nu_numero')->implode(', ');
            return redirect()->back()->withErrors([
                'warning' => 'Existen tickets Vendidos: ' . $NumerosVendidos
            ]);
        }

        DB::beginTransaction();

        try {

            if (!$request->whatsapp) {

                $resp =   ArchivoTrait::UploadComprobante($request, $request->idJugada, $request->tickets);

                if ($resp->ok) {
                    $file = $resp->file;
                } else {
                    return redirect()->back()->withErrors([
                        'error' => $resp->error
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

            try {
                $MailTo = env('MAIL_DESTINO', 'lyustiz@gmail.com');
                Mail::to($MailTo)->send(new NotificacionVenta($venta));
            } catch (\Exception $e) {
                Log::error('Error al enviar el correo: ' . $e->getMessage());
            }

            return redirect()->back()->with(
                key: [
                    'venta' => $venta,
                    'idventa' => $venta->id,
                    'success' => 'Registro actualizado correctamente.',
                ]
            );

        } catch (\Exception $e) {
            DB::rollBack();
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
