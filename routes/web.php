<?php

use App\Enum\PermisosEnum;
use App\Http\Controllers\ConfiguracionController;
use App\Http\Controllers\ProfileController;
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

Route::redirect("/", "/dashboard");

Route::get('/loteria', function () {
    return Inertia::render('Loteria');
})->name('loteria');;

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
        ->only(['index', 'show']);
    });
});

require __DIR__.'/auth.php';
