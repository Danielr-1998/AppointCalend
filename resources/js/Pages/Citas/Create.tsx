import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';  // Esto se usa para manejar formularios en Inertia.js

interface Profesional {
    id: number;
    nombre: string;
    apellido: string;
}

interface Props {
    profesionales: Profesional[];
}

const Create = ({ profesionales }: Props) => {
    const { data, setData, post, processing, errors } = useForm({
        fecha_hora: '',
        descripcion: '',
        profesional_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('citas.store'), {
            onSuccess: () => {
                // Lógica después de la creación exitosa
            },
        });
    };

    return (
        <div className="max-w-7xl mx-auto py-6">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="fecha_hora" className="block text-sm font-medium text-gray-700">
                        Fecha y Hora
                    </label>
                    <input
                        id="fecha_hora"
                        name="fecha_hora"
                        type="datetime-local"
                        value={data.fecha_hora}
                        onChange={(e) => setData('fecha_hora', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.fecha_hora && <div className="text-red-500 text-sm">{errors.fecha_hora}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={data.descripcion}
                        onChange={(e) => setData('descripcion', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    {errors.descripcion && <div className="text-red-500 text-sm">{errors.descripcion}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="profesional_id" className="block text-sm font-medium text-gray-700">
                        Profesional
                    </label>
                    <select
                        id="profesional_id"
                        name="profesional_id"
                        value={data.profesional_id}
                        onChange={(e) => setData('profesional_id', e.target.value)}
                        className="mt-1 block w-full"
                    >
                        <option value="">Seleccione un profesional</option>
                        {profesionales.map((profesional) => (
                            <option key={profesional.id} value={profesional.id}>
                                {profesional.nombre} {profesional.apellido}
                            </option>
                        ))}
                    </select>
                    {errors.profesional_id && <div className="text-red-500 text-sm">{errors.profesional_id}</div>}
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Crear Cita
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Create;
