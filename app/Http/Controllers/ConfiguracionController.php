<?php

namespace App\Http\Controllers;

use App\Http\Resources\ConfiguracionResource;
use App\Models\Configuracion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ConfiguracionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginated =  Configuracion::latest()->paginate(10);

        return Inertia::render("Configuracion/Index", [
            "configuraciones" => ConfiguracionResource::collection($paginated),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Configuracion/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "referencia" => ["required", "string"],
            "descripcion" => ["nullable", "string"],
            "valor" => ["required", "integer"],
        ]);

        $data['id_usuario'] = Auth::user()->id;
        $data['id_estado'] = 1;

        Configuracion::create($data);

        return to_route('configuracion.index')->with('success', 'Configuracion Creada Correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show(Configuracion $configuracion)
    {
        return Inertia::render("Configuracion/Show", [
            "configuracion" => new ConfiguracionResource($configuracion),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Configuracion $configuracion)
    {
        return Inertia::render("Configuracion/Edit", [
            "configuracion" => new ConfiguracionResource($configuracion),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Configuracion $configuracion)
    {
        $data = $request->validate([
            "referencia" => ["required", "string"],
            "descripcion" => ["nullable", "string"],
            "valor" => ["required", "integer"],
            'id_estado' => ["required", "integer"]
        ]);

        $configuracion->update($data);

        return to_route('configuracion.index')->with('success', 'Configuracion Actualizada Correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Configuracion $configuracion)
    {
        $configuracion->delete();

        return to_route('configuracion.index')->with('success', 'Configuracion Eliminada Correctamente');

    }
}
