<?php

namespace App\Http\Controllers;

use App\Models\Venta;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class VentaController extends Controller
{
    private const PENDIENTE = 3;
    private const RESERVADO = 4;
    private const VENDIDO = 5;
    private const CANCELADO = 6;
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginated =  Venta::latest()->paginate(perPage: 10);

        return Inertia::render("Venta/Index", [
            "ventas" => $paginated,
            "imgPath" => "/storage/comprobante/"
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

            $venta->update([
                'id_estado' => $this::VENDIDO,
                'tx_referencia' => $request->referencia,
                'id_usuario' => $request->user()->id
            ]);

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

            $venta->update([
                'id_estado' => $this::CANCELADO,
                'id_usuario' => $request->user()->id,
                'tx_observaciones' => $request->observaciones
            ]);

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
