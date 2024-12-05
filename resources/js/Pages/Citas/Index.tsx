// resources/js/Pages/Citas/Index.tsx

import React, { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import DefaultLayout from '@/Layouts/DefaultLayout';  // Asegúrate de importar el layout de la aplicación

interface Cita {
    id: number;
    fecha_hora: string;
    descripcion: string;
    profesional: {
        name: string;
    };
}

export default function Index() {
    const { citas } = usePage().props; // Accediendo a las citas pasadas desde el controlador
    const [citasList, setCitasList] = useState<Cita[]>(citas);

    useEffect(() => {
        setCitasList(citas);
    }, [citas]);

    return (
        <DefaultLayout title="Mis Citas">
            <div className="max-w-7xl mx-auto p-6">
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Mis Citas</h2>
                    <Link href={route('citas.create')} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Crear Cita
                    </Link>
                </div>

                <div className="overflow-x-auto shadow rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left border-b">Fecha y Hora</th>
                                <th className="px-4 py-2 text-left border-b">Descripción</th>
                                <th className="px-4 py-2 text-left border-b">Profesional</th>
                                <th className="px-4 py-2 text-left border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citasList.map((cita) => (
                                <tr key={cita.id} className="border-b">
                                    <td className="px-4 py-2">{cita.fecha_hora}</td>
                                    <td className="px-4 py-2">{cita.descripcion}</td>
                                    <td className="px-4 py-2">{cita.profesional.name}</td>
                                    <td className="px-4 py-2">
                                        <Link
                                            href={route('citas.show', cita.id)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            Ver Detalles
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>
    );
}
