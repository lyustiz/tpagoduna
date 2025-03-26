<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Jugada;
use Inertia\Inertia;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $id_jugada = $request->input('id_jugada') ?? 0;
        
        $jugadas = Jugada::select('id', 'fe_fecha', 'id_estado')
                          ->orderBy('id_estado')
                          ->orderBy('id')
                          ->get();

        $jugada = $id_jugada == 0 ? $jugadas->first() : $jugadas->find($id_jugada);

        if ($jugada == null) {
            return Inertia::render("Ticket/Index", [
                "tickets" => [],
                "jugadas" => $jugadas,
                "id_jugada" => 0
            ]);
        }

        $tickets = Ticket::where('id_jugada', $jugada->id)
                         ->with('venta')
                         ->orderBy('nu_numero')
                         ->paginate(1000);

        return Inertia::render("Ticket/Index", [
            "tickets" => $tickets,
            "jugadas" => $jugadas,
            "id_jugada" => $jugada->id
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
    public function store(StoreTicketRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        $ticket->load('jugada', 'venta');

        return Inertia::render("Ticket/Show", [
            "ticket" => $ticket
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        //
    }
}
