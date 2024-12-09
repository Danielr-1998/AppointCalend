<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    // Función para obtener el total de citas 'pendiente'
    public function citasPendientes()
    {
        return Cita::where('estado', 'pendiente')->count();
    }

    // Función para obtener el total de citas 'atendida'
    public function citasAtendidas()
    {
        return Cita::where('estado', 'atendida')->count();
    }

    // Función para obtener el total de citas 'cancelada'
    public function citasCanceladas()
    {
        return Cita::where('estado', 'cancelada')->count();
    }

    // Función para obtener el total de citas 'reprogramada'
    public function citasReprogramadas()
    {
        return Cita::where('estado', 'reprogramada')->count();
    }

    // Función para mostrar todas las citas por estado
    public function index()
    {
        // Obtener el total de citas por cada estado
        $pendientes = $this->citasPendientes();
        $atendidas = $this->citasAtendidas();
        $canceladas = $this->citasCanceladas();
        $reprogramadas = $this->citasReprogramadas();

        // Pasar los resultados a la vista con Inertia
        return inertia('Dashboard', [
            'pendientes' => $pendientes,
            'atendidas' => $atendidas,
            'canceladas' => $canceladas,
            'reprogramadas' => $reprogramadas,
        ]);
    }
}
