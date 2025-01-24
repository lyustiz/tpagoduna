<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sorteos', function (Blueprint $table) {
            $table->id();
            $table->date('fe_fecha');
            $table->time('hh_hora');
            $table->foreignId('id_loteria');
            $table->foreignId('id_configuracion_sorteo');
            $table->integer('nu_numero1');
            $table->integer('nu_numero2');
            $table->integer('nu_numero3');
            $table->integer('nu_numero4');
            $table->integer('nu_numero5');
            $table->integer('nu_numero6');
            $table->integer('nu_extra');
            $table->foreignId('id_estado');
            $table->string('tx_observaciones')->nullable();
            $table->foreignId('id_usuario')->unsigned();
            $table->timestamps();
            $table->foreign('id_usuario')->references('id')->on('users');
            $table->foreign('id_loteria')->references('id')->on('loterias');
            $table->foreign('id_configuracion_sorteo')->references('id')->on('configuracion_sorteos');
            $table->foreign('id_estado')->references('id')->on('estados');
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sorteos');
    }
};
