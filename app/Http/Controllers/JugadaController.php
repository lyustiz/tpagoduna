<?php

namespace App\Http\Controllers;

use App\Models\Jugada;
use App\Http\Requests\StoreJugadaRequest;
use App\Http\Requests\UpdateJugadaRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JugadaController extends Controller
{
    
    private const ACTIVO = 1;
    private const INACTIVO = 2;

    private const CERRADO = 7;
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginated = Jugada::orderBy('id')->with('estado')->paginate(10);

        return Inertia::render("Jugada/Index", [
            "jugadas" => $paginated
        ]);
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
    public function store(StoreJugadaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Jugada $jugada)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jugada $jugada)
    {
        return Inertia::render("Jugada/Edit", [
            "jugada" => $jugada,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Jugada $jugada)
    {
        $request->validate([
            'id_estado' => 'required|exists:estados,id'

        ]);
    }

    public function activar(Request $request, string $id)
    {
        try {

            $jugada = Jugada::find($id);

            if (!$jugada) {
                return redirect()->back()->withErrors([
                    'error' => 'La jugada no existe'
                ]);
            }

            if ($jugada->id_estado == $this::ACTIVO) {
                return redirect()->back()->withErrors([
                    'error' => 'La jugada ya esta activa'
                ]);
            }

            $jugadaActiva =  Jugada::where('id_estado', $this::ACTIVO)
                                    ->where('id', '<>', $id)  
                                    ->first();

            if ($jugadaActiva) {
                return redirect()->back()->withErrors([
                    'error' => 'Esxiste una jugada activa'
                ]);
            }

            try {
                $jugada->update([
                    'id_estado' => $this::ACTIVO,
                    'id_usuario' => $request->user()->id
                ]);
            } catch (\Throwable $th) {
                return redirect()->back()->withErrors([
                    'error' => $th->getMessage()
                ]);
            }

            return redirect()->back()->with('success', 'Jugada activada correctamente.');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors([
                'error' => $th->getMessage()
            ]);
        }
    }

    public function desactivar(Request $request, string $id)
    {
        try {

            $jugada = Jugada::find($id);

            if (!$jugada) {
                return redirect()->back()->withErrors([
                    'error' => 'La jugada no existe'
                ]);
            }

            try {
                $jugada->update([
                    'id_estado' => $this::INACTIVO,
                    'id_usuario' => $request->user()->id
                ]);
            } catch (\Throwable $th) {
                return redirect()->back()->withErrors([
                    'error' => $th->getMessage()
                ]);
            }

            return redirect()->back()->with('success', 'Jugada desactivada correctamente.');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors([
                'error' => $th->getMessage()
            ]);
        }
    }

    public function cerrar(Request $request, string $id)
    {
        try {

            $jugada = Jugada::find($id);

            if (!$jugada) {
                return redirect()->back()->withErrors([
                    'error' => 'La jugada no existe'
                ]);
            }

            try {
                $jugada->update([
                    'id_estado' => $this::CERRADO,
                    'id_usuario' => $request->user()->id
                ]);
            } catch (\Throwable $th) {
                return redirect()->back()->withErrors([
                    'error' => $th->getMessage()
                ]);
            }

            return redirect()->back()->with('success', 'Jugada cerrada correctamente.');
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors([
                'error' => $th->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jugada $jugada)
    {
        //
    }
}
