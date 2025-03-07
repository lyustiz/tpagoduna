<?php

namespace App\Http\Controllers;

use App\Models\Jugada;
use App\Http\Requests\StoreJugadaRequest;
use App\Http\Requests\UpdateJugadaRequest;
use Inertia\Inertia;

class JugadaController extends Controller
{
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
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJugadaRequest $request, Jugada $jugada)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jugada $jugada)
    {
        //
    }
}
