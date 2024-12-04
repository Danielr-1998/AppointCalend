// app/Http/Controllers/CitaController.php

namespace App\Http\Controllers;

use App\Models\Cita;
use App\Models\Profesional;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CitaController extends Controller
{
    public function __construct()
    {
        // Se asegura que solo los usuarios autenticados puedan acceder
        $this->middleware('auth');
    }

    /**
     * Muestra el listado de citas.
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $citas = Cita::with('profesional')->where('user_id', Auth::id())->get();
        return view('citas.index', compact('citas'));
    }

    /**
     * Muestra el formulario para crear una nueva cita.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        $profesionales = Profesional::all();
        return view('citas.create', compact('profesionales'));
    }

    /**
     * Guarda una nueva cita en la base de datos.
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

        // Crear cita
        Cita::create([
            'fecha_hora' => $request->fecha_hora,
            'descripcion' => $request->descripcion,
            'user_id' => Auth::id(),
            'profesional_id' => $request->profesional_id,
        ]);

        return redirect()->route('citas.index')->with('success', 'Cita creada exitosamente.');
    }

    /**
     * Muestra los detalles de una cita.
     *
     * @param \App\Models\Cita $cita
     * @return \Illuminate\View\View
     */
    public function show(Cita $cita)
    {
        return view('citas.show', compact('cita'));
    }
}
