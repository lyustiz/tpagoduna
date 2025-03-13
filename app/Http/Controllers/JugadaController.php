<?php

namespace App\Http\Controllers;

use App\Models\Jugada;
use App\Http\Requests\StoreJugadaRequest;
use App\Http\Requests\UpdateJugadaRequest;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;



class JugadaController extends Controller
{
    
    private const ACTIVO = 1;
    private const INACTIVO = 2;

    private const PENDIENTE = 3;
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
        return Inertia::render("Jugada/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nu_tickets'=> 'required|integer|min:1',
            'fe_fecha'=> 'required|date|after_or_equal:today',
            'mo_valor_ticket'=> 'required|numeric|min:1',
            'mo_valor_divisa'=> 'required|numeric|min:1',
            'nu_minutos_cierre'=> 'required|integer|min:1',
        ]);

        $request->merge([
            'id_usuario' => $request->user()->id,
            'id_estado' => self::INACTIVO,
        ]);   

        try {

            DB::beginTransaction();

            $jugada  = Jugada::create($request->all());
            $tickets = [];
            for ($i = 1; $i <= ($jugada->nu_tickets - 1); $i++) {
                $tickets[] = [
                    'id_jugada' => $jugada->id,
                    'nu_numero' => $i,
                    'id_estado' => self::PENDIENTE,
                    'id_usuario' => $request->user()->id,
                    'created_at' => now()
                ];
            }

            $chunks = array_chunk($tickets, 100); // Divide los datos en trozos de 100 registros

            foreach ($chunks as $chunk) {
                Ticket::insert($chunk);
            }

            DB::commit();

        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->back()->withErrors([
                'error' =>  'Error al Crear Jugada: ' + $th->getMessage()
            ]);
        }

        return to_route('jugada.index')->with('success', 'Jugada creada correctamente');
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
            'fe_fecha'=> 'required|date',
            'mo_valor_ticket'=> 'required|numeric',
            'mo_valor_divisa'=> 'required|numeric',
            'nu_minutos_cierre'=> 'required|integer',
        ]);

        $request->merge([
            'id_usuario' => $request->user()->id
        ]);   

        try {
            $jugada = $jugada->update($request->all());
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors([
                'error' =>  'Error al Actualizar Jugada: ' + $th->getMessage()
            ]);
        }

        return to_route('jugada.index')->with('success', 'Jugada actualizada correctamente');
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
