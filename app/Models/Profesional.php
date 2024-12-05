<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profesional extends Model
{
    use HasFactory;
    protected $table = 'profesionales'; // Nombre de la tabla en la base de datos

    /**
     * Define la relación inversa con el modelo Cita (un profesional tiene muchas citas)
     */
    public function citas()
    {
        return $this->hasMany(Cita::class);
    }
}

