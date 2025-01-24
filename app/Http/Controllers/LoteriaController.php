<?php

namespace App\Http\Controllers;

use App\Models\Loteria;
use App\Http\Requests\StoreLoteriaRequest;
use App\Http\Requests\UpdateLoteriaRequest;

class LoteriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Loteria::with([ 'estado:id,tx_nombre' ])->get();
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
    public function store(StoreLoteriaRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Loteria $loteria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Loteria $loteria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLoteriaRequest $request, Loteria $loteria)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Loteria $loteria)
    {
        //
    }
}
