import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { DashboardProps } from '@/types/Dashboard';  // Importa la interfaz DashboardProps

// Tipar las propiedades del componente con la interfaz DashboardProps
export default function Dashboard({
    pendientes,
    atendidas,
    canceladas,
    reprogramadas
}: DashboardProps) {
    return (
        <AuthenticatedLayout
           
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium">Resumen de Citas</h3>

                            {/* Sección de estadísticas de citas */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                                <div className="bg-blue-100 p-4 rounded-lg shadow-sm text-center">
                                    <h4 className="font-semibold text-xl">Pendientes</h4>
                                    <p className="text-lg font-bold">{pendientes}</p>
                                </div>
                                <div className="bg-green-100 p-4 rounded-lg shadow-sm text-center">
                                    <h4 className="font-semibold text-xl">Atendidas</h4>
                                    <p className="text-lg font-bold">{atendidas}</p>
                                </div>
                                <div className="bg-red-100 p-4 rounded-lg shadow-sm text-center">
                                    <h4 className="font-semibold text-xl">Canceladas</h4>
                                    <p className="text-lg font-bold">{canceladas}</p>
                                </div>
                                <div className="bg-yellow-100 p-4 rounded-lg shadow-sm text-center">
                                    <h4 className="font-semibold text-xl">Reprogramadas</h4>
                                    <p className="text-lg font-bold">{reprogramadas}</p>
                                </div>
                            </div>

                            {/* Aquí puedes agregar más contenido o detalles sobre las citas */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
