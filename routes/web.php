<?php

use App\Enum\PermisosEnum;
use App\Http\Controllers\CompraController;
use App\Http\Controllers\ConfiguracionController;
use App\Http\Controllers\JugadaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VentaController;
use App\Http\Controllers\TicketController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});*/


Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::resource('/compra',  CompraController::class)
        ->only(['index', 'store']);


Route::get('/loteria', function () {
    return Inertia::render('Loteria');
})->name('loteria');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['verified'])->group( function(){
        
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');;

        Route::resource('/configuracion',  ConfiguracionController::class)
        ->except(['index', 'show'])
        ->middleware('can:'.PermisosEnum::AdministrarConfiguracion->value);

        Route::resource('/configuracion',  ConfiguracionController::class)
        ->middleware('can:'.PermisosEnum::AdministrarConfiguracion->value);

        Route::resource('/venta',  VentaController::class)->only(['index', 'show']);
        Route::get('/ventas', [VentaController::class, 'index'])->name('ventas.index');
        Route::post('/ventas/{id}/confirm', [VentaController::class, 'confirm'])->name('ventas.confirm');
        Route::post('/ventas/{id}/cancel', [VentaController::class, 'cancel'])->name('ventas.cancel');

        Route::resource('/jugada',  JugadaController::class)->only(['index', 'create', 'store', 'edit', 'update']);;
        Route::post('/jugada/{id}/activar', [JugadaController::class, 'activar'])->name('jugada.activar');
        Route::post('/jugada/{id}/desactivar', [JugadaController::class, 'desactivar'])->name('jugada.desactivar');
        Route::post('/jugada/{id}/cerrar', [JugadaController::class, 'cerrar'])->name('jugada.cerrar');

        Route::resource('/ticket',  TicketController::class)->only(['index', 'show']);
        //
    });
});

require __DIR__.'/auth.php';
