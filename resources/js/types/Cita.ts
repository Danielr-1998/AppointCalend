// resources/js/types/Cita.ts

export interface Profesional {
    id: number;
    name: string;
}

export interface Cita {
    id: number;
    fecha_hora: string;
    descripcion: string;
    profesional_id: number;
    profesional: Profesional; // Aquí lo asociamos con un profesional
}
