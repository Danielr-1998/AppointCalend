<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Cita;
class DashboardController extends Controller
{
    //
    public function ShowCitas()
    {
        // Buscar la cita por id
        $cita = Cita::findOrFail();
    
        // Actualizar el estad
    
        // Responder con un mensaje de éxito
        return redirect()->route('citas.index')->with('estadoActualizado', 'Estado actualizado correctamente');
    }
}
