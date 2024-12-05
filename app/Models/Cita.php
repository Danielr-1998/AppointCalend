<?php 
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cita extends Model
{
    use HasFactory;

    protected $fillable = [
        'fecha_hora',
        'descripcion',
        'user_id',
        'profesional_id',
    ];

    /**
     * Define la relación con el modelo Profesional (una cita pertenece a un profesional)
     */
    public function profesional()
    {
        return $this->belongsTo(Profesional::class);
    }
}
