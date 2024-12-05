<?php

namespace App\Http\Controllers;

use App\Models\Cita;
use App\Models\Profesional;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CitaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Mostrar el listado de citas.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Obtener todas las citas del usuario autenticado
        $citas = Cita::with('profesional')->where('user_id', Auth::id())->get();
        
        // Retornar las citas a la vista de Inertia
        return Inertia::render('Citas/Index', [
            'citas' => $citas,
        ]);
    }

    /**
     * Mostrar el formulario para crear una nueva cita.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        // Obtener todos los profesionales disponibles
        $profesionales = Profesional::all();
        
        // Retornar la vista de crear cita con los profesionales disponibles
        return Inertia::render('Citas/Create', [
            'profesionales' => $profesionales,
        ]);
    }

    /**
     * Guardar una nueva cita en la base de datos.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'fecha_hora' => 'required|date',
            'descripcion' => 'required',
            'profesional_id' => 'required|exists:profesionales,id',
        ]);

        // Crear la cita
        Cita::create([
            'fecha_hora' => $request->fecha_hora,
            'descripcion' => $request->descripcion,
            'user_id' => Auth::id(),
            'profesional_id' => $request->profesional_id,
        ]);

        // Redirigir al listado de citas con mensaje de éxito
        return redirect()->route('citas.index')->with('success', 'Cita creada exitosamente.');
    }

    /**
     * Mostrar los detalles de una cita.
     *
     * @param \App\Models\Cita $cita
     * @return \Inertia\Response
     */
    public function show(Cita $cita)
    {
        // Retornar los detalles de la cita a la vista
        return Inertia::render('Citas/Show', [
            'cita' => $cita,
        ]);
    }
}
