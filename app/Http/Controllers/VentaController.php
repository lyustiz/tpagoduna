<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use App\Models\Ticket;
use App\Models\Jugada;
use App\Models\VentaTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class VentaController extends Controller
{

    private const ACTIVO = 1;
    private const PENDIENTE = 3;
    private const RESERVADO = 4;
    private const VENDIDO = 5;
    private const CANCELADO = 6;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        $id_estado = $request->input('id_estado') ?? 0;
        $id_jugada = $request->input('id_jugada') ?? 0;

        $jugadas = Jugada::select('id', 'fe_fecha')
                          ->orderBy('id_estado')
                          ->orderBy('id')
                          ->get();

        $jugada = $id_jugada == 0 ? $jugadas->first() : $jugadas->find($id_jugada);

        $query = Venta::where('id_jugada', $jugada->id)->latest()->with('ventaTickets');

        if ($id_estado != null && $id_estado != '0') {
            $query->where('id_estado', $id_estado);
        }

        $paginated = $query->paginate(10);

        return Inertia::render("Venta/Index", [
            "ventas" => $paginated,
            "imgPath" => "/storage/comprobante/",
            "idEstado" =>  $id_estado ?? 0,
            "jugadas" => $jugadas,
            "id_jugada" => $jugada->id
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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

    public function confirm(Request $request, string $id)
    {
        try {

            $venta = Venta::find($id);

            if (!$venta) {
                return redirect()->back()->withErrors([
                    'error' => 'La venta no existe'
                ]);
            }

            if ($venta->id_estado == $this::CANCELADO) {
                return redirect()->back()->withErrors([
                    'error' => 'La venta  ya ha sido cancelada'
                ]);
            }

            if ($venta->id_estado == $this::VENDIDO) {
                return redirect()->back()->withErrors([
                    'error' => 'La venta  ya ha sido confirmada'
                ]);
            }

            DB::beginTransaction();

            try {
                $venta->update([
                    'id_estado' => $this::VENDIDO,
                    'tx_referencia' => $request->referencia,
                    'id_usuario' => $request->user()->id
                ]);

                Ticket::where('id_venta', $id)->update([
                    'id_estado' => self::VENDIDO,
                    'id_usuario' => $request->user()->id
                ]);

                VentaTicket::where('id_venta', $id)->update([
                    'id_estado' => self::VENDIDO,
                    'id_usuario' => $request->user()->id
                ]);

                DB::commit();
            } catch (\Throwable $th) {
                DB::rollBack();
                return redirect()->back()->withErrors([
                    'error' => $th->getMessage()
                ]);
            }

            return redirect()->back()->with('success', 'Venta confirmada correctamente.');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors([
                'error' => $th->getMessage()
            ]);
        }
    }

    public function cancel(Request $request, int $id)
    {
        try {

            $venta = Venta::find($id);

            if (!$venta) {
                return redirect()->back()->withErrors([
                    'error' => 'La venta no existe'
                ]);
            }

            if ($venta->id_estado == $this::CANCELADO) {
                return redirect()->back()->withErrors([
                    'error' => 'La venta ya ha sido cancelada'
                ]);
            }

            if ($venta->id_estado == $this::VENDIDO) {
                return redirect()->back()->withErrors([
                    'error' => 'La venta ya ha sido confirmada'
                ]);
            }

            DB::beginTransaction();

            try {

                $venta->update([
                    'id_estado' => $this::CANCELADO,
                    'id_usuario' => $request->user()->id,
                    'tx_observaciones' => $request->observaciones
                ]);

                Ticket::where('id_venta', $id)->update([
                    'id_venta' => null,
                    'id_estado' => self::PENDIENTE,
                    'id_usuario' => $request->user()->id
                ]);

                VentaTicket::where('id_venta', $id)->update([
                    'id_estado' => self::CANCELADO,
                    'id_usuario' => $request->user()->id
                ]);
                DB::commit();
            } catch (\Throwable $th) {
                DB::rollBack();
                return redirect()->back()->withErrors([
                    'error' => $th->getMessage()
                ]);
            }

            return redirect()->back()->with('success', 'Venta cancelada correctamente.');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors([
                'error' => $th->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
